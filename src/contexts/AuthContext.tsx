import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  phone_number?: string;
  location?: string;
  profile_picture?: string;
  account_type?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Candidate API bases; we'll autodetect the working one via /health
const CANDIDATE_API_BASES = [
  // Proven working base (per your products URL)
  'https://admin.burjmall.com/api/public/api/public',
  // Other possibilities
  'https://api.burjmall.com/public/api/public',
  'https://api.burjmall.com/public/api',
  'https://api.burjmall.com/api/public',
  'https://admin.burjmall.com/api/public/api',
  'https://admin.burjmall.com/api/public',
];

let RESOLVED_API_BASE: string | null = null;

async function resolveApiBase(): Promise<string> {
  if (RESOLVED_API_BASE) return RESOLVED_API_BASE;
  const cached = localStorage.getItem('api_base_url');
  if (cached) {
    // Verify cached base still works against products endpoint
    try {
      const verify = await fetch(`${cached}/public/products?page=1`, { method: 'GET' });
      if (verify.ok) {
        RESOLVED_API_BASE = cached;
        return cached;
      }
    } catch {}
    localStorage.removeItem('api_base_url');
  }
  for (const base of CANDIDATE_API_BASES) {
    try {
      // Probe products endpoint since /health may not exist
      const res = await fetch(`${base}/public/products?page=1`, { method: 'GET' });
      if (res.ok) {
        RESOLVED_API_BASE = base;
        localStorage.setItem('api_base_url', base);
        return base;
      }
    } catch {}
  }
  // Fallback to first candidate
  RESOLVED_API_BASE = CANDIDATE_API_BASES[0];
  return RESOLVED_API_BASE;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const persist = (nextUser: AuthUser | null, nextToken: string | null) => {
    if (nextToken) {
      localStorage.setItem('auth_token', nextToken);
    } else {
      localStorage.removeItem('auth_token');
    }
    
    if (nextUser) {
      localStorage.setItem('auth_user', JSON.stringify(nextUser));
    } else {
      localStorage.removeItem('auth_user');
    }
    
    setUser(nextUser);
    setToken(nextToken);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const form = new URLSearchParams();
      form.append('email', email);
      form.append('password', password);

      const base = await resolveApiBase();
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: form
      });

      const raw = await res.text();
      let json: any = null;
      
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch (e) {
        throw new Error(`Unexpected response from server: ${raw.slice(0, 120)}`);
      }

      if (!res.ok || !json?.success) {
        // Surface backend validation errors if present
        if (json?.errors && typeof json.errors === 'object') {
          const msgs = Object.values(json.errors as Record<string, string[]>)
            .flat()
            .join('\n');
          throw new Error(json?.message ? `${json.message}\n${msgs}` : msgs || 'Login failed');
        }
        throw new Error(json?.message || 'Login failed');
      }

      persist(json.data.user, json.data.access_token);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload: { name: string; email: string; password: string; password_confirmation: string }) => {
    setLoading(true);
    try {
      const form = new URLSearchParams();
      form.append('name', payload.name);
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('password_confirmation', payload.password_confirmation);
      form.append('role', 'user');

      const base = await resolveApiBase();
      const res = await fetch(`${base}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: form
      });

      const raw = await res.text();
      let json: any = null;
      
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch (e) {
        throw new Error(`Unexpected response from server: ${raw.slice(0, 120)}`);
      }

      if (!res.ok || !json?.success) {
        if (json?.errors && typeof json.errors === 'object') {
          const msgs = Object.values(json.errors as Record<string, string[]>)
            .flat()
            .join('\n');
          throw new Error(json?.message ? `${json.message}\n${msgs}` : msgs || 'Validation error');
        }
        throw new Error(json?.message || 'Validation error');
      }

      persist(json.data.user, json.data.access_token);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        const base = await resolveApiBase();
        await fetch(`${base}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    persist(null, null);
  };

  const value = useMemo(() => ({ user, token, loading, login, signup, logout }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
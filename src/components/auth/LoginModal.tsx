import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const LoginModal: React.FC<{ open: boolean; onClose: () => void; onSwitchToSignup: () => void }> = ({ open, onClose, onSwitchToSignup }) => {
  const { login, loading } = useAuth();
  const { show } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      show('Logged in successfully.', 'success');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-burj-orange text-white px-5 py-3 font-semibold">Login</div>
        <form onSubmit={submit} className="px-5 py-4 space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-burj-orange hover:bg-orange-600 text-white py-2 rounded transition-colors disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="text-sm text-gray-600 text-center">
            Don't have an account? <button type="button" className="text-burj-orange hover:underline" onClick={onSwitchToSignup}>Create one</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;



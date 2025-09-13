import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const SignupModal: React.FC<{ open: boolean; onClose: () => void; onSwitchToLogin: () => void }> = ({ open, onClose, onSwitchToLogin }) => {
  const { signup, loading } = useAuth();
  const { show } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      await signup({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      show('Account created successfully. Please login.', 'success');
      onClose();
      onSwitchToLogin();
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-burj-orange text-white px-5 py-3 font-semibold">
          Create Account
        </div>
        
        <form onSubmit={submit} className="px-5 py-4 space-y-4">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded border">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input 
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              disabled={loading}
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Min 8 chars, mixed case, numbers, symbols
            </p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burj-orange" 
              value={passwordConfirmation} 
              onChange={e => setPasswordConfirmation(e.target.value)} 
              required 
              disabled={loading}
              minLength={8}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-burj-orange hover:bg-orange-600 text-white py-2 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="text-sm text-gray-600 text-center">
            Already have an account? {' '}
            <button 
              type="button" 
              className="text-burj-orange hover:underline" 
              onClick={onSwitchToLogin}
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
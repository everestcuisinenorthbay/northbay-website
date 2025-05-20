'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { sanityClient } from '@/lib/sanity'; // Not used for login logic now
// import { getSanityClientWithAuth } from '@/lib/sanityClientWithAuth'; // Not used for login logic now

// Hardcoded credentials REMOVED
// const TEST_CREDENTIALS = {
//   username: 'admin',
//   password: 'everest123'
// };

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('admin-authenticated', 'true');
        storage.setItem('admin-user', JSON.stringify(data.user));
        
        // Clear the other storage to be safe
        const otherStorage = rememberMe ? sessionStorage : localStorage;
        otherStorage.removeItem('admin-authenticated');
        otherStorage.removeItem('admin-user');

        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials. Please check your username and password.');
        localStorage.removeItem('admin-authenticated');
        localStorage.removeItem('admin-user');
        sessionStorage.removeItem('admin-authenticated');
        sessionStorage.removeItem('admin-user');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred during login. Please try again.');
      localStorage.removeItem('admin-authenticated');
      localStorage.removeItem('admin-user');
      sessionStorage.removeItem('admin-authenticated');
      sessionStorage.removeItem('admin-user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-500 mb-6">Enter your credentials to access the dashboard</p>
            {/* Removed test credentials display */}
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username" // Added autocomplete
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-everest-green focus:border-everest-green transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password" // Added autocomplete
                required
                value={password} // Added value binding for password
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-everest-green focus:border-everest-green transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-everest-green focus:ring-everest-green border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-everest-green to-emerald-800 hover:from-everest-green hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-everest-green transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-10">
          <p className="text-sm text-center text-gray-500">
            <Link href="/" className="font-medium text-everest-green hover:text-everest-gold transition-colors">
              Return to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
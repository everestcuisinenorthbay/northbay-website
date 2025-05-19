'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sanityClient } from '@/lib/sanity';
import { getSanityClientWithAuth, clearSanityAuthClient } from '@/lib/sanityClientWithAuth';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    name: 'Menu',
    href: '/admin/menu',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
        />
      </svg>
    ),
  },
  {
    name: 'Blog',
    href: '/admin/blog',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    ),
  },
  {
    name: 'Studio',
    href: '/studio',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
        />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        if (pathname === '/admin/login') {
          setIsLoading(false);
          return;
        }
        
        // Check for our new authentication marker
        const isAuthenticatedMarker = localStorage.getItem('admin-authenticated');
        
        if (isAuthenticatedMarker === 'true') {
          setIsAuthenticated(true);
        } else {
          // No valid marker, redirect to login
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
          setIsAuthenticated(false);
        }
        
      } catch (err) {
        console.error('Authentication check error:', err);
        setError('Error checking authentication status. Please try logging in again.');
        setIsAuthenticated(false);
        
        // Clear any potentially stale auth markers
        localStorage.removeItem('admin-authenticated');
        localStorage.removeItem('admin-user'); // Also clear user info
        clearSanityAuthClient(); // Clear any Sanity specific auth state
        
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    // Clear our new authentication markers
    localStorage.removeItem('admin-authenticated');
    localStorage.removeItem('admin-user');
    clearSanityAuthClient(); // Clear Sanity specific auth state
    router.push('/admin/login');
  };

  // If we're on the login page, just render children (the login page)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="w-16 h-16 border-4 border-everest-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // We'll redirect to login in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gradient-to-br from-everest-green to-emerald-800">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-5">
                <Link href="/" className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="bg-white text-everest-green p-1 rounded-md">EC</span>
                  <span>Everest Cuisine</span>
                </Link>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                          isActive
                            ? 'bg-white text-everest-green shadow-md'
                            : 'text-white hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <div
                          className={`mr-3 flex-shrink-0 ${
                            isActive ? 'text-everest-green' : 'text-white group-hover:text-white'
                          }`}
                        >
                          {item.icon}
                        </div>
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col p-4 border-t border-white/10">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 transition-colors py-2 px-4 rounded-md mb-4 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
              <Link href="/" className="w-full flex items-center justify-center text-white text-sm bg-white/10 hover:bg-white/20 rounded-md p-2 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to website
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Mobile header */}
          <div className="md:hidden bg-gradient-to-r from-everest-green to-emerald-800 text-white p-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold flex items-center">
                <span className="bg-white text-everest-green p-1 rounded-md mr-2">EC</span>
                Everest Cuisine
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center text-white bg-white/20 hover:bg-white/30 p-2 rounded-md"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="mt-4 bg-white rounded-md shadow-lg overflow-hidden">
                <nav className="divide-y divide-gray-200">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium ${
                          isActive
                            ? 'bg-everest-green/10 text-everest-green'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className={`mr-3 ${isActive ? 'text-everest-green' : 'text-gray-500'}`}>
                          {item.icon}
                        </div>
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="divide-y divide-gray-200">
                    <Link
                      href="/"
                      className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-3 text-gray-500"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                      Back to Website
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 
import { createClient } from 'next-sanity';
import { config } from './sanity';

// This is a client-side only file.
// let sanityAuthClient: any = null; // No longer caching a separate auth client this way

// Initialize auth client (only in browser)
export function getSanityClientWithAuth() {
  if (typeof window === 'undefined') {
    // console.warn('Sanity client (with auth placeholder) attempted to initialize outside browser.');
    return null; // Not in browser, or no specific auth setup here yet
  }

  // Previously, this function would try to use credentials from localStorage.
  // That was a test setup and insecure for actual credentials.
  // For now, this function will return a standard client.
  // True authenticated Sanity operations would require a token obtained from a secure backend process.

  // console.log('getSanityClientWithAuth called. Returning standard client for now.');
  
  // Return a new instance or a cached one based on your app needs.
  // For simplicity, returning a new client configured like the standard one.
  return createClient({
    ...config,
    useCdn: false, // Typically false for clients that might perform writes or need fresh data
    // token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // If you have a general read token for client side
    // Or, a token specific to the authenticated user would be set here if available
  });
}

export function clearSanityAuthClient() {
  // This function was used to clear the cached sanityAuthClient.
  // Since we are not caching it in the same way, this function's role might change.
  // For now, it doesn't need to do anything specific with a client instance here.
  // console.log('clearSanityAuthClient called.');
  // If there was a specific client instance to clear/reset:
  // sanityAuthClient = null;
  // Potentially, you might want to clear any stored auth tokens if they were managed by this module.
  // localStorage.removeItem('sanity-user-token'); // Example if you were storing a token
} 
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configuration for the Sanity client
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: false, // Setting to false to always use the API directly for write operations
  token: process.env.SANITY_API_TOKEN, // Use the env variable
};

// Create a Sanity client with error handling
export const sanityClient = createClient(config);

// Create a client without a token for public data
export const sanityPublicClient = createClient({
  ...config,
  token: undefined,
  useCdn: true,
});

// Set up a helper function for generating image URLs with fallback
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  if (!source) {
    // Return a placeholder image URL if source is undefined
    return { url: () => '/placeholder-image.svg' };
  }
  return builder.image(source);
} 
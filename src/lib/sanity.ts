import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configuration for the Sanity client
export const config = {
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
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
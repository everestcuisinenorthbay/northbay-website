export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E5E7EB" offset="20%" />
      <stop stop-color="#F3F4F6" offset="50%" />
      <stop stop-color="#E5E7EB" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E5E7EB" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Predefined sizes for common image dimensions
export const getImagePlaceholder = (width: number, height: number) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
};

// Helper for the LazyImage component
export const getAspectRatio = (width: number, height: number) => {
  return (height / width) * 100;
};

// Generate sizes attribute for responsive images
export const getSizes = (
  mobile = '100vw', 
  tablet = '50vw', 
  desktop = '33vw'
) => {
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
};

export const optimizeImageUrl = (url: string): string => {
  // Handle relative paths
  if (url.startsWith('/')) {
    return url;
  }
  
  // Handle absolute URLs - you can add logic to process third-party URLs here
  try {
    const urlObj = new URL(url);
    return url;
  } catch (e) {
    // If URL parsing fails, return the original URL
    return url;
  }
}; 
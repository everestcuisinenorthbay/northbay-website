'use client';

import React, { ReactNode } from 'react';

interface LazyLoadingProviderProps {
  children: ReactNode;
}

const LazyLoadingProvider: React.FC<LazyLoadingProviderProps> = ({ children }) => {
  // Set global flags and configuration for image loading
  React.useEffect(() => {
    // Configure IntersectionObserver settings for better lazy loading
    if (typeof window !== 'undefined') {
      // Add data attribute to track image loads
      document.documentElement.setAttribute('data-lazy-images', 'enabled');
      
      // Configure image loading behavior
      const preloadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        // After page load, preload nearby images that are likely to be seen soon
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;
                if (image.dataset.src) {
                  image.src = image.dataset.src;
                  image.removeAttribute('data-src');
                }
                imageObserver.unobserve(image);
              }
            });
          }, {
            rootMargin: '200px 0px', // Start loading images when they're 200px from viewport
            threshold: 0.01 // Trigger when 1% of the image is visible
          });
          
          images.forEach((img) => {
            imageObserver.observe(img);
          });
        }
      };
      
      // Run preload after page has finished loading
      if (document.readyState === 'complete') {
        preloadImages();
      } else {
        window.addEventListener('load', preloadImages);
        return () => window.removeEventListener('load', preloadImages);
      }
    }
  }, []);
  
  return <>{children}</>;
};

export default LazyLoadingProvider; 
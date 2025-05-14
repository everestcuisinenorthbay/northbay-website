import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface LazyImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  placeholderColor?: string;
  transitionDuration?: number;
  withFade?: boolean;
  withScaleUp?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  placeholderColor = '#E5E7EB',
  transitionDuration = 0.5,
  withFade = true,
  withScaleUp = false,
  alt,
  src,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Hide placeholder after animation completes
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowPlaceholder(false);
      }, transitionDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, transitionDuration]);

  const variants = {
    hidden: { 
      opacity: 0,
      scale: withScaleUp ? 0.95 : 1,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: transitionDuration,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="relative overflow-hidden" style={{ ...props.style }}>
      {/* Placeholder */}
      {showPlaceholder && (
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundColor: placeholderColor,
            opacity: isLoaded ? 0 : 1,
            transition: `opacity ${transitionDuration}s ease-out`,
          }}
        />
      )}
      
      {/* Actual Image */}
      <motion.div
        initial={withFade ? "hidden" : "visible"}
        animate={isLoaded ? "visible" : "hidden"}
        variants={variants}
      >
        <Image
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleImageLoad}
          {...props}
        />
      </motion.div>
    </div>
  );
};

export default LazyImage; 
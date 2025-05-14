'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import LazyImage from './LazyImage';
import { getImagePlaceholder } from '@/lib/imageUtils';

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  image?: string;
  className?: string;
}

const MenuCard = ({
  name,
  description,
  price,
  isVegetarian = false,
  isSpicy = false,
  isGlutenFree = false,
  image,
  className,
}: MenuCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const clampLength = 80;
  const isClamped = description.length > clampLength;
  const displayText = expanded || !isClamped ? description : description.slice(0, clampLength) + '...';
  
  // Generate a placeholder for the image
  const placeholderDataUrl = getImagePlaceholder(300, 300);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 ease-out border border-transparent hover:border-[#D4A373]/30 ${className || ''}`}
    >
      {image ? (
        <div className="relative aspect-square w-full overflow-hidden">
          <LazyImage
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            placeholderColor="#F5F5F4"
            withFade={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <span className="absolute top-2 right-2 text-[#5C4033] font-medium bg-[#FEFAE0] px-2 py-0.5 rounded transition-colors duration-500 ease-out group-hover:bg-[#FEFAE0]/80 font-sans z-10">{price}</span>
        </div>
      ) : (
        <div className="aspect-square w-full bg-gradient-to-r from-[#FEFAE0] to-[#FFF9F0] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4A373] transition-transform duration-500 ease-out group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <span className="absolute top-2 right-2 text-[#5C4033] font-medium bg-[#FEFAE0] px-2 py-0.5 rounded transition-colors duration-500 ease-out group-hover:bg-[#FEFAE0]/80 font-sans">{price}</span>
        </div>
      )}
      
      <div className="p-6 flex flex-col h-64">
        {/* Title Section */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-[#2C1810] leading-tight group-hover:text-[#5C4033] transition-colors duration-500 ease-out font-sans">{name}</h3>
        </div>
        
        {/* Description Section - takes available space between title and tags */}
        <div className="flex-grow overflow-y-auto mb-4">
          <p className="text-[#5C4033] text-sm leading-relaxed font-sans">
            {displayText}
            {isClamped && !expanded && (
              <button
                className="text-everest-green text-xs font-medium underline hover:text-everest-gold transition-colors ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
              >
                Read more
              </button>
            )}
            {isClamped && expanded && (
              <button
                className="text-everest-green text-xs font-medium underline hover:text-everest-gold transition-colors ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              >
                Read less
              </button>
            )}
          </p>
        </div>
        
        {/* Dietary Tags - always at bottom */}
        <div className={`flex flex-wrap gap-2 pt-3 mt-auto ${(isVegetarian || isSpicy || isGlutenFree) ? 'border-t border-[#D4A373]/20' : ''}`}>
            {isVegetarian && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium border border-green-100 font-sans transition-colors duration-500 ease-out group-hover:bg-green-50/90">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Veg</span>
              </span>
            )}
            {isSpicy && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 px-2.5 py-1 rounded-full text-xs font-medium border border-red-100 font-sans transition-colors duration-500 ease-out group-hover:bg-red-50/90">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Spicy</span>
              </span>
            )}
            {isGlutenFree && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100 font-sans transition-colors duration-500 ease-out group-hover:bg-blue-50/90">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>GF</span>
              </span>
            )}
          </div>
      </div>
    </motion.div>
  );
};

export default MenuCard; 
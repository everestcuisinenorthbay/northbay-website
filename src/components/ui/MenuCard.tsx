'use client';

import Image from '@/components/ui/Image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 ease-out border border-transparent hover:border-[#D4A373]/30 h-full ${className || ''}`}
    >
      {/* Mobile-optimized layout - horizontal card */}
      <div className="md:hidden flex flex-row h-auto">
      {image ? (
          <div className="relative w-1/3 aspect-square">
          <Image
            src={image}
            alt={name}
            fill
              wrapperClassName="relative w-full h-full"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
            <div className="absolute top-2 right-2">
              <span className="text-white font-medium bg-everest-green/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs">{price}</span>
            </div>
        </div>
      ) : (
          <div className="w-1/3 aspect-square bg-gradient-to-r from-[#FEFAE0] to-[#FFF9F0] flex items-center justify-center relative overflow-hidden">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute top-2 right-2">
              <span className="text-[#5C4033] font-medium bg-[#FEFAE0] px-2 py-0.5 rounded text-xs">{price}</span>
            </div>
          </div>
        )}
        
        <div className="w-2/3 p-4 flex flex-col relative">
          {/* Title Section */}
          <div className="mb-2">
            <h3 className="text-base font-semibold text-[#2C1810] leading-tight group-hover:text-[#5C4033] transition-colors duration-500 ease-out font-sans">{name}</h3>
          </div>
          
          {/* Description Section */}
          <div className="flex-grow overflow-y-auto mb-3">
            <p className="text-[#5C4033] text-sm leading-relaxed font-sans">
              {displayText}
              {isClamped && !expanded && (
                <button
                  className="text-everest-green text-xs font-medium hover:text-everest-gold transition-colors ml-1"
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
                  className="text-everest-green text-xs font-medium hover:text-everest-gold transition-colors ml-1"
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
          
          {/* Dietary Tags */}
          <div className={`flex flex-wrap gap-1 ${(isVegetarian || isSpicy || isGlutenFree) ? 'border-t border-[#D4A373]/20 pt-2' : ''}`}>
            {isVegetarian && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 px-2 py-0.5 rounded-full text-[10px] font-medium border border-green-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>Veg</span>
              </span>
            )}
            {isSpicy && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 px-2 py-0.5 rounded-full text-[10px] font-medium border border-red-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Spicy</span>
              </span>
            )}
            {isGlutenFree && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium border border-blue-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>GF</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop layout - more compact for 3-column grid */}
      <div className="hidden md:flex md:flex-col h-full">
        {image ? (
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              wrapperClassName="relative w-full h-full"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-3 right-3">
              <span className="text-[#5C4033] font-medium bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full transition-all duration-500 ease-out group-hover:bg-white font-sans shadow-md text-sm">{price}</span>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-square bg-gradient-to-r from-[#FEFAE0] to-[#FFF9F0] flex items-center justify-center relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute top-3 right-3">
              <span className="text-[#5C4033] font-medium bg-[#FEFAE0] px-3 py-1 rounded-full shadow-md text-sm">{price}</span>
            </div>
        </div>
      )}
      
        <div className="p-4 flex flex-col flex-grow">
        {/* Title Section */}
          <div className="mb-2">
          <h3 className="text-base font-semibold text-[#2C1810] leading-tight group-hover:text-[#5C4033] transition-colors duration-500 ease-out font-sans">{name}</h3>
        </div>
        
        {/* Description Section - takes available space between title and tags */}
          <div className="flex-grow mb-3">
          <p className="text-[#5C4033] text-sm leading-relaxed font-sans">
            {displayText}
            {isClamped && !expanded && (
              <button
                  className="text-everest-green text-xs font-medium hover:text-everest-gold transition-colors ml-1"
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
                  className="text-everest-green text-xs font-medium hover:text-everest-gold transition-colors ml-1"
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
          <div className={`flex flex-wrap gap-2 pt-2 mt-auto ${(isVegetarian || isSpicy || isGlutenFree) ? 'border-t border-[#D4A373]/20' : ''}`}>
            {isVegetarian && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>Veg</span>
              </span>
            )}
            {isSpicy && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium border border-red-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Spicy</span>
              </span>
            )}
            {isGlutenFree && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-100 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>GF</span>
              </span>
            )}
          </div>
          </div>
      </div>
    </motion.div>
  );
};

export default MenuCard; 
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

export default function Modal({ isOpen, onClose, imageSrc, altText }: ModalProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] rounded-lg overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10 bg-black/30 rounded-full p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="relative w-full h-[80vh]">
              <Image 
                src={imageSrc} 
                alt={altText} 
                fill 
                className="object-contain" 
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
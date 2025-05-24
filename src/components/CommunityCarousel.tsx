'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import Modal from './Modal';

interface CarouselItem {
  id: string;
  imageSrc: string;
  altText: string;
}

// TODO: Update this array with your 7 images.
// Using the original 5 images as placeholders for now.
const items: CarouselItem[] = [
  { id: 'event-1', imageSrc: '/community/event-1.jpg', altText: 'Community Event 1' },
  { id: 'event-2', imageSrc: '/community/event-2.jpg', altText: 'Community Event 2' },
  { id: 'event-3', imageSrc: '/community/event-3.jpg', altText: 'Community Event 3' },
  { id: 'event-4', imageSrc: '/community/event-4.jpg', altText: 'Community Event 4' },
  { id: 'event-5', imageSrc: '/community/event-5.jpg', altText: 'Community Event 5' },
  { id: 'event-6', imageSrc: '/community/event-6.jpg', altText: 'Community Event 6' },
  { id: 'event-7', imageSrc: '/community/event-7.jpg', altText: 'Community Event 7' },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function CommunityCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: none, 1: next, -1: prev
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CarouselItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const changeSlide = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + newDirection + items.length) % items.length;
      return newIndex;
    });
  };

  const goToSlide = (newIndex: number) => {
    const currentEffectiveIndex = activeIndex;
    if (newIndex === currentEffectiveIndex) return;
    setDirection(newIndex > currentEffectiveIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const openModalForItem = (item: CarouselItem) => {
    // Allow modal open only if not dragging, to prevent accidental clicks during swipe
    if (!isDragging) {
      setSelectedImage(item);
      setModalOpen(true);
    }
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    // Short timeout to distinguish between a tap and a drag for modal opening
    setTimeout(() => setIsDragging(false), 50);

    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      changeSlide(1); // Swiped left, go to next
    } else if (swipe > swipeConfidenceThreshold) {
      changeSlide(-1); // Swiped right, go to previous
    }
    // If swipe is not strong enough, the image will snap back due to dragConstraints
    // or stay if dragElastic allows some movement and no constraint is hit.
    // For a snapping carousel, the motion.div should animate back to x:0 if not swiped enough.
    // This is implicitly handled by `animate="center"` and `dragConstraints`.
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentItem = items[activeIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center py-0">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex} // Ensures re-render and animation trigger on activeIndex change
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Constrains drag within the div
            dragElastic={0.1} // Allows a small amount of elastic drag beyond constraints
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onClick={() => openModalForItem(currentItem)}
            role="button" // for accessibility, since it's clickable
            aria-label={currentItem?.altText || 'Carousel image'}
            tabIndex={0} // make it focusable
          >
            {currentItem && (
              <Image
                src={currentItem.imageSrc}
                alt={currentItem.altText}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => changeSlide(-1)}
              className="absolute top-0 bottom-0 left-0 w-20 z-20 flex items-center justify-start pl-2 sm:pl-4 text-everest-green hover:text-everest-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-everest-gold scale-100 hover:scale-110 hide-on-touch"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <button
              onClick={() => changeSlide(1)}
              className="absolute top-0 bottom-0 right-0 w-20 z-20 flex items-center justify-end pr-2 sm:pr-4 text-everest-green hover:text-everest-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-everest-gold scale-100 hover:scale-110 hide-on-touch"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {items.length > 1 && (
        <div className="mt-6 flex justify-center space-x-2 sm:space-x-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              title={`Go to image ${i + 1}`}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-everest-gold dark:focus-visible:ring-offset-gray-900
                ${i === activeIndex
                  ? 'bg-everest-gold scale-125 w-4 sm:w-5'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            // Optional: Delay clearing selectedImage to allow modal fade-out animation
            setTimeout(() => setSelectedImage(null), 300);
          }}
          imageSrc={selectedImage.imageSrc}
          altText={selectedImage.altText}
        />
      )}

      <style jsx global>{`
        .hide-on-touch {
          /* Hide on touch devices only */
          @media (pointer: coarse) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

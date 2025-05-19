'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, Bars3Icon, XMarkIcon, HomeIcon, BookOpenIcon, CalendarIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Handle window resize - close mobile menu on desktop widths
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Animation variants
  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: { 
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    },
    open: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        height: { duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };
  
  const navItemVariants = {
    closed: { y: -10, opacity: 0 },
    open: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.05 * i,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <header className="w-full bg-everest-cream border-b-2 border-everest-gold/60 shadow-sm font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-everest-gold/95 to-everest-gold text-everest-green py-2 text-sm font-semibold tracking-wide font-sans relative overflow-hidden">
        {/* Decorative elements for visual interest */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
          <div className="w-16 h-full bg-everest-green/30 transform -skew-x-12"></div>
          <div className="w-16 h-full bg-everest-green/30 transform skew-x-12"></div>
        </div>
        
        <div className="container mx-auto px-4 flex justify-between items-center text-center md:text-left relative">
          <div className="hidden md:flex items-center text-base font-semibold font-sans">
            <span className="inline-block w-2 h-2 bg-everest-green rounded-full mr-2 animate-pulse"></span>
            <span>OPEN 7 DAYS A WEEK</span>
            <span className="inline-block w-2 h-2 bg-everest-green rounded-full ml-2 animate-pulse"></span>
          </div>
          
          {/* Mobile optimized layout */}
          <div className="flex md:hidden items-center justify-center text-xs space-x-1.5 w-full">
            <span className="bg-everest-green/10 px-2 py-0.5 rounded-full text-everest-green/90">OPEN DAILY</span>
            <span>•</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
              11:30-12:00
            </div>
            <span>•</span>
            <Link 
              href="tel:+16139634406" 
              className="flex items-center gap-1 hover:text-everest-green/80 transition-colors font-sans"
            >
              <PhoneIcon className="w-3 h-3" />
              <span>613-963-4406</span>
            </Link>
          </div>
          
          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-6 font-sans">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
              11:30 AM - 12:00 AM
            </div>
            <div className="h-4 w-px bg-everest-green/30"></div>
            <Link 
              href="tel:+16139634406" 
              className="flex items-center gap-1.5 hover:text-everest-green/80 transition-colors font-sans group"
            >
              <span className="bg-everest-green/10 p-1 rounded-full group-hover:bg-everest-green/20 transition-colors">
                <PhoneIcon className="w-3.5 h-3.5" />
              </span>
              <span className="font-semibold">613-963-4406</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-everest-cream py-3 font-sans" ref={navRef}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 font-sans">
              <Link href="/" className="block group font-sans">
                <div className="flex flex-col items-start font-sans">
                  <div className="flex items-center font-sans">
                    <Image 
                      src="/everest-logo-header.png" 
                      alt="Everest Cuisine Logo" 
                      width={220} 
                      height={70}
                      className="group-hover:opacity-90 transition-opacity"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center font-sans">
              <ul className="flex space-x-8 font-sans">
                <li>
                  <Link href="/" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/book-table" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    Book Table
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-everest-green hover:text-everest-gold py-2 font-semibold transition-colors text-base uppercase tracking-wide font-sans">
                    Contact
                  </Link>
                </li>
                <li className="ml-2">
                  <Link 
                    href="https://app.kash4meexpress.com/everestcuisine/ec/book/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-everest-green text-everest-cream hover:bg-everest-gold hover:text-everest-green px-6 py-2 rounded-full transition-colors text-base uppercase tracking-wide font-bold shadow font-sans"
                  >
                    Order Now
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button with animation */}
            <motion.button 
              className="lg:hidden bg-everest-green/5 hover:bg-everest-green/10 p-2 rounded-md text-everest-green transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-gradient-to-b from-everest-cream to-everest-cream/95 border-t border-everest-gold/40 overflow-hidden z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="container mx-auto px-4 py-5">
              <ul className="grid gap-3">
                <motion.li custom={0} variants={navItemVariants}>
                  <Link 
                    href="/" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Home</span>
                  </Link>
                </motion.li>
                <motion.li custom={1} variants={navItemVariants}>
                  <Link 
                    href="/menu" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Menu</span>
                  </Link>
                </motion.li>
                <motion.li custom={2} variants={navItemVariants}>
                  <Link 
                    href="/book-table" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Book Table</span>
                  </Link>
                </motion.li>
                <motion.li custom={3} variants={navItemVariants}>
                  <Link 
                    href="/about-us" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>About Us</span>
                  </Link>
                </motion.li>
                <motion.li custom={4} variants={navItemVariants}>
                  <Link 
                    href="/blog" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Blog</span>
                  </Link>
                </motion.li>
                <motion.li custom={5} variants={navItemVariants}>
                  <Link 
                    href="/contact" 
                    className="flex items-center justify-center py-3 text-everest-green font-medium transition-colors hover:text-everest-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Contact</span>
                  </Link>
                </motion.li>
                <motion.li custom={6} variants={navItemVariants} className="pt-3">
                  <Link 
                    href="https://app.kash4meexpress.com/everestcuisine/ec/book/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-everest-green text-everest-cream py-3.5 px-4 font-bold rounded-lg hover:bg-everest-gold hover:text-everest-green transition-colors shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span>Order Now</span>
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 
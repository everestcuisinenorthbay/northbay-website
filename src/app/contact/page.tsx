'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, MapPinIcon, ClockIcon, ChevronDownIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [openSection, setOpenSection] = useState<string | null>('visit');
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/contact-hero.jpg" 
            alt="Contact Us" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/90"></div>
        </div>
      
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-everest-gold mx-auto mb-6"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          We'd love to hear from you! Feel free to reach out for reservations, inquiries, or feedback.
          </motion.p>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-everest-cream/50 to-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative max-w-6xl">
          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
            {/* Contact information card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl lg:rounded-tr-none lg:rounded-br-none shadow-lg border border-gray-100 overflow-hidden z-10"
            >
              <div className="bg-gradient-to-r from-everest-green to-emerald-700 p-6">
                <h2 className="text-2xl font-serif text-white">Contact Information</h2>
                <p className="text-white/80 font-sans mt-1">Reach out to us through any of these channels</p>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Visit Us Section */}
                <div>
                  <button 
                    onClick={() => toggleSection('visit')}
                    className="w-full flex items-center justify-between lg:justify-start mb-4 lg:cursor-default"
                  >
                    <div className="flex items-center">
                      <div className="bg-everest-green/10 p-2.5 rounded-full mr-4">
                        <MapPinIcon className="w-5 h-5 text-everest-green" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 font-serif">Visit Us</h3>
            </div>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-everest-green lg:hidden transition-transform duration-200 ${
                        openSection === 'visit' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {(openSection === 'visit' || windowWidth >= 1024) && (
                      <motion.address 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="not-italic text-gray-600 pl-14 border-l border-everest-green/20 ml-3 font-sans overflow-hidden"
                      >
              <div className="mb-3">
                <div className="font-medium">Our Location:</div>
                <div>1846 Carling Ave</div>
                <div>Ottawa, ON K2A 1E2</div>
                        </div>
                      </motion.address>
                    )}
                  </AnimatePresence>
              </div>
              
                <div className="pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => toggleSection('hours')}
                    className="w-full flex items-center justify-between lg:justify-start mb-4 lg:cursor-default"
              >
                    <div className="flex items-center">
                      <div className="bg-everest-green/10 p-2.5 rounded-full mr-4">
                        <ClockIcon className="w-5 h-5 text-everest-green" />
            </div>
                      <h3 className="text-lg font-medium text-gray-800 font-serif">Opening Hours</h3>
          </div>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-everest-green lg:hidden transition-transform duration-200 ${
                        openSection === 'hours' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {(openSection === 'hours' || windowWidth >= 1024) && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-14 border-l border-everest-green/20 ml-3 text-gray-600 font-sans overflow-hidden"
                      >
              <li className="mb-2">
                <span className="font-medium">Monday - Sunday:</span>
                <span className="ml-2">11:30 AM - 12:00 AM</span>
              </li>
                        <li className="text-sm text-gray-500">
                We are open 7 days a week, including holidays
              </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
          </div>
          
                <div className="pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => toggleSection('contact')}
                    className="w-full flex items-center justify-between lg:justify-start mb-4 lg:cursor-default"
                  >
                    <div className="flex items-center">
                      <div className="bg-everest-green/10 p-2.5 rounded-full mr-4">
                        <PhoneIcon className="w-5 h-5 text-everest-green" />
              </div>
                      <h3 className="text-lg font-medium text-gray-800 font-serif">Contact Methods</h3>
            </div>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-everest-green lg:hidden transition-transform duration-200 ${
                        openSection === 'contact' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {(openSection === 'contact' || windowWidth >= 1024) && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-14 border-l border-everest-green/20 ml-3 space-y-4 text-gray-600 font-sans overflow-hidden"
                      >
              <li>
                <div className="font-medium mb-1">Phone:</div>
                          <Link href="tel:+16139634406" className="text-everest-green hover:text-everest-gold transition-colors">
                  613-963-4406
                </Link>
              </li>
              <li>
                <div className="font-medium mb-1">Email:</div>
                          <Link href="mailto:everestcuisineottawa@gmail.com" className="text-everest-green hover:text-everest-gold transition-colors">
                  everestcuisineottawa@gmail.com
                </Link>
              </li>
              <li>
                <div className="font-medium mb-1">For Reservations:</div>
                          <Link href="/book-table" className="text-everest-green hover:text-everest-gold transition-colors">
                  Book a Table Online
                </Link>
              </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex gap-4 pl-3">
                    <a 
                      href="https://www.facebook.com/everestcuisineottawa" 
                      target="_blank"
                      rel="noreferrer" 
                      aria-label="Facebook"
                      className="bg-everest-green/10 hover:bg-everest-green/20 p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-everest-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/everestcuisineottawa/" 
                      target="_blank"
                      rel="noreferrer" 
                      aria-label="Instagram"
                      className="bg-everest-green/10 hover:bg-everest-green/20 p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-everest-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
          </div>
        </div>
            </motion.div>
        
        {/* Google Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[50vh] lg:h-full rounded-xl lg:rounded-tl-none lg:rounded-bl-none overflow-hidden shadow-lg border border-gray-100 relative lg:-ml-px"
            >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.9535765520136!2d-75.7973177!3d45.4346264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce044c841a4fe3%3A0xb3d20ba6de3520cc!2s1846%20Carling%20Ave%2C%20Ottawa%2C%20ON%20K2A%201E2%2C%20Canada!5e0!3m2!1sen!2sus!4v1722431485345!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Location"
          ></iframe>

              {/* Get Directions button - positioned at bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <Link 
                  href="https://maps.google.com/?q=1846+Carling+Ave,+Ottawa,+ON+K2A+1E2" 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 bg-everest-green hover:bg-everest-gold text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors font-medium shadow-md text-sm sm:text-base w-full sm:w-auto sm:inline-flex"
                >
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Get Directions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Online ordering section - with delivery-background image */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/delivery-background.png"
            alt="Food Delivery Background"
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/95 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Order Online</h2>
              <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
              <p className="text-white/95 font-sans max-w-2xl mx-auto text-lg">
                Get authentic Nepalese cuisine delivered or ready for pickup
              </p>
            </motion.div>
            
            <div className="flex flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 max-w-6xl mx-auto flex-wrap md:flex-nowrap">
              <a 
                href="https://www.ubereats.com/ca/store/everest-cuisine-ottawa/xc0tc89RU_m7jiz7ue_X0Q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="logo-shine group"
              >
                <Image 
                  src="/ubereats-white.png" 
                  alt="Uber Eats" 
                  width={170} 
                  height={170} 
                  className="object-contain transition-all duration-300" 
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                  }} 
                />
              </a>
              
              <a 
                href="https://www.doordash.com/store/everest-cuisine-ottawa-27901530" 
                target="_blank" 
                rel="noopener noreferrer"
                className="logo-shine group"
              >
                <Image 
                  src="/doordash-white.png" 
                  alt="DoorDash" 
                  width={170} 
                  height={170} 
                  className="object-contain transition-all duration-300" 
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                  }} 
                />
              </a>
              
              <a 
                href="https://www.skipthedishes.com/everest-cuisine-ottawa" 
            target="_blank" 
            rel="noopener noreferrer"
                className="logo-shine group"
              >
                <Image 
                  src="/skipthedishes-white.png" 
                  alt="SkipTheDishes" 
                  width={170} 
                  height={170} 
                  className="object-contain transition-all duration-300" 
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                  }} 
                />
              </a>
              
              <a 
                href="https://app.kash4meexpress.com/everestcuisine/ec/book" 
            target="_blank" 
            rel="noopener noreferrer"
                className="logo-shine group"
              >
                <Image 
                  src="/kash4me-white.png" 
                  alt="Kash4me" 
                  width={170} 
                  height={170} 
                  className="object-contain transition-all duration-300" 
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                  }} 
                />
              </a>
        </div>
        
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
                Order for delivery or pickup directly through Kash4me
              </span>
            </motion.div>
      </div>
    </div>
      </div>
    </>
  );
} 
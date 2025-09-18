'use client';

import { motion } from 'framer-motion';
import { ClockIcon, PhoneIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { locations } from '@/data/locations';

export default function BookTablePage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-everest-cream to-[#FFF9F0]">
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/book-hero.jpg" 
            alt="Restaurant Interior" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/90"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Reserve Your Table
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
            Experience the authentic flavors of Nepal in our elegant dining space
          </motion.p>
        </div>
      </div>
      
      {/* Glassmorphic Booking Form */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-4xl">
        <motion.div 
          className="relative mb-20"
          variants={fadeInUp}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-everest-gold/10 to-everest-green/10 rounded-2xl transform -rotate-1 scale-[1.02] -z-10"></div>
          <div className="backdrop-blur-md bg-white/70 border border-white/50 rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-everest-green/90 to-emerald-700/90 p-8">
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">Make a Reservation</h2>
              <p className="text-white/90 font-sans">Fill out the form below to reserve your table</p>
            </div>
            
            <div className="p-8 text-center">
              <h3 className="text-2xl font-serif text-everest-green mb-4">Online Reservations Coming Soon!</h3>
              <p className="text-slate-600 mb-6">
                We are currently working on bringing online reservations to our North Bay location. 
                In the meantime, please call us at <a href="tel:705-495-2030" className="font-semibold text-everest-green hover:underline">705-495-2030</a> to book your table.
              </p>
              <p className="text-slate-500 text-sm">We apologize for any inconvenience.</p>
            </div>
          </div>
        </motion.div>
      </div>
        
      {/* Reservation Information */}
        <motion.div 
        className="w-full"
          variants={fadeInUp}
          custom={2}
          initial="hidden"
          animate="visible"
        >
        <div className="bg-everest-green py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-serif text-white text-center mb-12">Dining Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1 font-sans">Opening Hours</h3>
                  <div className="text-white/80 font-sans">
                    <p><strong>North Bay:</strong> {locations[0].hours}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1 font-sans">Large Groups</h3>
                  <p className="text-white/80 font-sans">For parties larger than 8, please call us directly.
                    <br />
                    <strong>NB:</strong> <a href={locations[0].phoneHref} className="text-everest-gold hover:text-white/90 transition-colors">{locations[0].phone}</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CalendarDaysIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1 font-sans">Reservation Policy</h3>
                  <p className="text-white/80 font-sans">We hold reservations for 15 minutes past the scheduled time</p>
            </div>
          </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1 font-sans">Special Events</h3>
                  <p className="text-white/80 font-sans">Private dining and catering available for special events</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center py-3 px-6 bg-white hover:bg-everest-gold text-everest-green hover:text-white font-medium rounded-lg transition-all duration-300 font-sans"
              >
                Contact Us for Special Arrangements
              </a>
            </div>
          </div>
        </div>
      </motion.div>
          
      {/* Order Online Section */}
          <motion.div 
        className="w-full bg-everest-cream/30 py-16"
        variants={fadeInUp}
        custom={3}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-serif text-everest-green text-center mb-12">Order Online</h2>
          <div className="flex flex-wrap justify-center gap-20 md:gap-32 lg:gap-40">
            <div className="logo-shine group opacity-50 cursor-not-allowed">
              <span className="relative inline-block">
                <Image src="/ubereats.png" alt="Uber Eats" width={220} height={220} className="object-contain filter grayscale" style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.2))' }} />
                <span className="shine-overlay"></span>
              </span>
            </div>
            <a href="https://www.doordash.com/store/everest-cuisine-north-bay-north-bay-27996637/34123769/?srsltid=AfmBOoqeOQAkgGJwNwEw0I-Sqqx2g2Biv8n2UGxUWZRQFUxhe6m4_vST" target="_blank" rel="noopener noreferrer" className="logo-shine group">
              <span className="relative inline-block">
                <Image src="/doordash.png" alt="DoorDash" width={220} height={220} className="object-contain" style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.2))' }} />
                <span className="shine-overlay"></span>
              </span>
            </a>
            <div className="logo-shine group opacity-50 cursor-not-allowed">
              <span className="relative inline-block">
                <Image src="/skipthedishes.png" alt="SkipTheDishes" width={220} height={220} className="object-contain filter grayscale" style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.2))' }} />
                <span className="shine-overlay"></span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Testimonial Section */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="h-0.5 w-24 bg-everest-gold mx-auto mb-10 opacity-70"></div>
          <p className="text-2xl text-gray-700 italic font-serif mb-6">
            "I am so so thankful for the owners of this place to have started this Nepalese restaurant this way, we do not have to drive to Toronto to have Indo Chinese or Authentic Nepalese food."
          </p>
          <p className="text-everest-green font-medium font-sans">— Vishwa Narayan</p>
        </motion.div>
      </div>
    </div>
  );
} 
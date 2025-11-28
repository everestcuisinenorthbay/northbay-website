'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { locations } from '@/data/locations';

export default function Footer() {
  const location = locations[0]; // North Bay is now the only location

  return (
    <footer className="bg-[#1a3329] text-everest-beige pt-16 pb-6 font-geist relative overflow-hidden tracking-wide">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Logo and Info Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-5">
            <Link href="/" className="mb-4">
              <Image 
                src="/footer-logo.png" 
                alt="Everest Cuisine Logo" 
                width={400} 
                height={120}
                className="h-36 w-auto"
              />
            </Link>
            <div className="mt-2 w-full max-w-sm mx-auto md:mx-0 relative">
              <div className="rounded-lg border border-everest-gold/20 bg-[#213b31] p-4 min-h-[160px] relative mb-4">
                <h5 className="text-everest-gold text-sm font-semibold tracking-wider mb-2">{location.name}</h5>
                <div className="flex items-start gap-3 mb-2">
                  <MapPinIcon className="w-4 h-4 text-everest-gold flex-shrink-0 mt-0.5" />
                  <address className="not-italic text-everest-beige/90 text-sm leading-relaxed">
                    {location.addressLine1}<br />
                    {location.addressLine2}
                  </address>
                </div>
                <div className="flex items-start gap-3 mb-2">
                  <PhoneIcon className="w-4 h-4 text-everest-gold flex-shrink-0 mt-0.5" />
                  <Link href={location.phoneHref} className="hover:text-everest-gold transition-colors text-sm">{location.phone}</Link>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-4 h-4 text-everest-gold flex-shrink-0 mt-0.5" />
                  <span className="text-everest-beige/90 text-sm">{location.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h4 className="text-base font-medium text-everest-gold mb-4 relative inline-block tracking-wider">
              Quick Links
              <span className="absolute -bottom-2 left-0 right-0 md:right-auto w-10 h-[2px] mx-auto md:mx-0 bg-everest-gold/60"></span>
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/menu" className="text-everest-beige/90 hover:text-everest-gold transition-colors text-sm tracking-wider">Menu</Link></li>
              <li><Link href="/book-table" className="text-everest-beige/90 hover:text-everest-gold transition-colors text-sm tracking-wider">Book a Table</Link></li>
              <li><Link href="/contact" className="text-everest-beige/90 hover:text-everest-gold transition-colors text-sm tracking-wider">Contact</Link></li>
              <li><Link href="/about-us" className="text-everest-beige/90 hover:text-everest-gold transition-colors text-sm tracking-wider">About Us</Link></li>
            </ul>
          </div>

          {/* Services Column - Hidden on mobile */}
          <div className="hidden md:flex md:col-span-3 flex-col items-start text-left gap-3">
            <h4 className="text-base font-medium text-everest-gold mb-4 relative inline-block tracking-wider">
              Our Services
              <span className="absolute -bottom-2 left-0 w-10 h-[2px] bg-everest-gold/60"></span>
            </h4>
            <ul className="grid grid-cols-1 gap-y-2.5 text-everest-beige/90 w-full">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Indoor Seating</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Takeout</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Delivery</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Catering</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Events</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-everest-gold/80 mr-2.5"></span>
                <span className="text-sm tracking-wider">Frozen Mo:Mo</span>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h4 className="text-base font-medium text-everest-gold mb-4 relative inline-block tracking-wider">
              Connect With Us
              <span className="absolute -bottom-2 left-0 right-0 md:right-auto w-10 h-[2px] mx-auto md:mx-0 bg-everest-gold/60"></span>
            </h4>
            <div className="space-y-4 mt-3">
              <div>
                <h5 className="text-xs text-everest-gold mb-2 tracking-wider">North Bay</h5>
                <div className="flex gap-6">
                  <a 
                    href={location.fb_link}
                    className="text-everest-beige/70 transition-all duration-300 hover:text-everest-gold hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(207,202,184,0.6)]" 
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </a>
                  <a 
                    href={location.ig_link}
                    className="text-everest-beige/70 transition-all duration-300 hover:text-everest-gold hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(207,202,184,0.6)]" 
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="text-xs text-everest-gold mb-3 tracking-wider">Order Online</h5>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a href="https://www.ubereats.com/ca/store/everest-cuisine-northbay-340-main-st-w/ibqp0yhPSx2IzAImL8Hn5Q?srsltid=AfmBOoo6fxagtlDVDS3Oq4DEzJ_quQsF82AUuPnzzSYe4G1uIoIjTP17" className="px-3 py-1.5 bg-[#2c463c] hover:bg-everest-gold/20 rounded-md text-xs tracking-wider transition-colors" target="_blank" rel="noopener noreferrer">UberEats</a>
                <a href="https://www.doordash.com/store/everest-cuisine-north-bay-north-bay-27996637/34123769/?srsltid=AfmBOoqeOQAkgGJwNwEw0I-Sqqx2g2Biv8n2UGxUWZRQFUxhe6m4_vST" className="px-3 py-1.5 bg-[#2c463c] hover:bg-everest-gold/20 rounded-md text-xs tracking-wider transition-colors" target="_blank" rel="noopener noreferrer">DoorDash</a>
                <div className="opacity-50 cursor-not-allowed">
                  <span className="px-3 py-1.5 bg-[#2c463c] rounded-md text-xs tracking-wider transition-colors filter grayscale">SkipTheDishes</span>
                </div>
              </div>
            </div>
            </div>
          </div>

        <div className="border-t border-everest-gold/20 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-everest-beige/70 text-xs tracking-wider text-center md:text-left">&copy; {new Date().getFullYear()} Everest Cuisine. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-everest-beige/70 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-everest-gold transition-colors tracking-wider">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-everest-gold transition-colors tracking-wider">Terms of Service</Link>
              <Link href="/about-us" className="hover:text-everest-gold transition-colors tracking-wider">About Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
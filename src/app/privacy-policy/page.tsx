'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen w-full font-sans bg-beige">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-everest-green mb-6 text-center">Privacy Policy</h1>
          <div className="w-24 h-1 bg-everest-gold mx-auto mb-12"></div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last Updated: August 1, 2023</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Introduction</h2>
            <p>Welcome to Everest Cuisine. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">The Information We Collect</h2>
            <p>When you visit our website or make a reservation, we may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Reservation details and preferences</li>
              <li>Browsing data and cookies</li>
              <li>Information you provide when you contact us</li>
            </ul>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing your reservations and requests</li>
              <li>Improving our website and services</li>
              <li>Sending you promotional communications, if you have opted in</li>
              <li>Responding to your inquiries</li>
              <li>Compliance with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Data Security</h2>
            <p>The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information, but we cannot guarantee its absolute security. We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Third-Party Services</h2>
            <p>We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform service-related tasks, or assist us in analyzing how our website is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Your Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: info@everestcuisine.com</li>
              <li>By phone: (123) 456-7890</li>
              <li>By mail: 123 Mountain View, Nepal Street, Toronto, ON</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center text-everest-green hover:text-everest-gold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 
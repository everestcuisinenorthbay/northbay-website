'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen w-full font-sans bg-beige">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-everest-green mb-6 text-center">Terms of Service</h1>
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
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to Everest Cuisine. These Terms of Service ("Terms") govern your use of our website, located at www.everestcuisine.com (the "Service"), and form a binding legal agreement between you and Everest Cuisine.</p>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">2. Use of Our Service</h2>
            <p>When using our Service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when making reservations</li>
              <li>Use the Service in a manner consistent with all applicable laws and regulations</li>
              <li>Not engage in any activity that could harm, disable, or impair the Service</li>
              <li>Not attempt to gain unauthorized access to any part of the Service</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
            </ul>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">3. Reservations and Cancellations</h2>
            <p>Through our Service, you can make reservations at our restaurant. Please note the following policies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reservations are subject to availability</li>
              <li>For parties of 6 or more, we require a credit card to secure your reservation</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>No-shows or late cancellations may result in a cancellation fee</li>
              <li>We reserve the right to release your table after 15 minutes if your party is late without notification</li>
            </ul>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">4. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Everest Cuisine and its licensors. The Service is protected by copyright, trademark, and other laws of both Canada and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Everest Cuisine.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">5. User-Generated Content</h2>
            <p>Users may post content to our Service (such as reviews or comments). You retain all rights to any content you submit, post, or display on or through the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content in any media format.</p>
            <p>You are responsible for any content you post and its compliance with applicable laws and regulations.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">6. Disclaimers</h2>
            <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>
            <p>Everest Cuisine does not warrant that the Service will be uninterrupted, timely, secure, or error-free. The information provided on the Service may contain errors or inaccuracies.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">7. Limitation of Liability</h2>
            <p>In no event shall Everest Cuisine, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of Ontario, Canada, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date. You are advised to review these Terms periodically for any changes.</p>
            
            <h2 className="text-2xl font-serif text-everest-green mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: everestcuisineottawa@gmail.com</li>
              <li>By phone: 613-963-4406</li>
              <li>By mail: 1846 Carling Ave, Ottawa, ON K2A 1E2</li>
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
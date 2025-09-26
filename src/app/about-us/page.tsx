'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CommunityCarousel from '@/components/CommunityCarousel';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story behind Everest Cuisine, North Bay's home for authentic Indo-Nepalese food. Discover our passion for fresh ingredients and traditional Himalayan recipes.",
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2
    } 
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export default function AboutUs() {
  return (
    <main className="min-h-screen w-full font-sans">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/our-story.jpg"
            alt="Our Story"
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
            Our Story
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
            Everest Cuisine brings the authentic, bold flavors of Indo-Nepalese cooking to North Bay. From Himalayan thalis to fiery Manchurian and our famous momos, we offer a welcoming culinary experience.
          </motion.p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full bg-beige py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center md:text-left"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
            
              <motion.h3 
                className="text-2xl sm:text-3xl font-serif text-everest-green mb-4"
                variants={fadeInUp}
              >
                Bringing the Himalayas to North Bay
              </motion.h3>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                Welcome to Everest Cuisine, where we bring the rich, authentic flavors of the Himalayas to the heart of North Bay. Our vision is simple: to share our love for genuine Nepalese and Indian food, from comforting bowls of thukpa to our famous Nepali thalis.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                We specialize in authentic momos, served steamed, fried, or in a savory jhol. But our journey doesn't stop there. Explore our Indo-Chinese favorites like Hakka chowmein. It's all made from scratch with generous portions and honest prices.
              </motion.p>
              <motion.p 
                className="text-slate-700"
                variants={fadeInUp}
              >
                We're thrilled to share the Everest experience with you. Whether you're here for a full Nepali meal or a quick fusion bite, we've got something with your name on it.
              </motion.p>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/everest-ext.jpg"
                  alt="Everest Cuisine Restaurant Interior"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-xl hidden md:block">
                <Image
                  src="/spices.jpg"
                  alt="Nepalese Spices"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-lg overflow-hidden shadow-xl hidden md:block">
                <Image
                  src="/logo-symbol.jpg"
                  alt="Everest Cuisine Logo"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="w-full bg-everest-green py-16 md:py-24 relative overflow-hidden">
        {/* Simplified pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M0 0h100v100H0z" fill="none"/>
            <path d="M50 0v100M0 50h100" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-4">Meet Our Chef</h2>
            <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
            <p className="text-white/80 max-w-2xl mx-auto italic text-lg">
              "Cooking is an art that transforms ingredients into experiences. I invite you to taste the journey."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="order-2 md:order-1 h-full">
              <motion.div 
                className="relative h-full overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/chef-hero.jpg"
                  alt="Chef Sagar Shrestha"
                  width={500}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="order-1 md:order-2 text-center md:text-left p-6 md:p-10 bg-white h-full flex flex-col justify-center"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl font-serif text-everest-green mb-4"
                variants={fadeInUp}
              >
                Chef Sagar Shrestha
              </motion.h3>
              <motion.div 
                className="w-16 h-1 bg-everest-gold mb-8 mx-auto md:mx-0"
                variants={fadeInUp}
              />
              <motion.p 
                className="text-slate-700 mb-6 leading-relaxed"
                variants={fadeInUp}
              >
                Born and raised in Kathmandu, Nepal, Chef Sagar Shrestha&apos;s culinary journey began in his mother&apos;s kitchen. With over 25 years of experience, he has mastered the art of Nepalese and Indian cuisine through formal training at Nepal Academy of Tourism and Hotel Management.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-6 leading-relaxed"
                variants={fadeInUp}
              >
                His passion for culinary excellence has taken him across the globe - from Saudi Arabia and Kuwait to Japan, where he mastered the art of sushi. His European training at Capo Bay Hotel in Cyprus further refined his skills. After moving to Canada nearly 9 years ago, Sagar worked in prestigious establishments like Kizuna Japanese Fine Cuisine, Hilton Hotel Saint John, Kasa Moto, and Miku Toronto.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-6 leading-relaxed"
                variants={fadeInUp}
              >
                At Everest Cuisine, Chef Sagar brings together his diverse culinary experiences to create dishes that honor traditional Nepalese cooking while incorporating innovative techniques from his international training. His expertise in both Nepalese and Indian cuisine allows him to create a menu that showcases the best of both culinary traditions, from the delicate flavors of momos to the rich, complex curries.
              </motion.p>
              <motion.p 
                className="text-slate-700 italic text-lg border-l-4 border-everest-gold pl-4 py-2"
                variants={fadeInUp}
              >
                &quot;Every dish we serve is a reflection of my journey - from the streets of Kathmandu to the finest restaurants across the world. I invite you to experience the authentic flavors of Nepal, crafted with passion and precision.&quot;
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <motion.section 
        className="w-full bg-beige py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl sm:text-5xl font-serif text-everest-green mb-4"
              variants={fadeInUp}
            >
              Giving Back to Our Community
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-everest-gold mx-auto mb-6"
              variants={fadeInUp}
            />
            <motion.p 
              className="text-slate-700 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              At Everest Cuisine, we believe in more than just great food. We are committed to supporting and uplifting our local community. Here are some of the ways we get involved.
            </motion.p>
          </div>

          {/* Image Carousel with Modals */}
          <motion.div variants={fadeIn} className="mt-8 md:mt-12">
            <CommunityCarousel />
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="relative w-full px-4 py-4 md:py-2 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/exp-bg.jpg"
            alt="Experience Authentic Nepalese Cuisine"
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
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Experience the Taste of Nepal Today</h2>
              <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
              <p className="text-white/95 font-sans max-w-2xl mx-auto text-lg">
                Join us for an unforgettable culinary journey through the flavors of the Himalayas
              </p>
            </motion.div>
            
           
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/menu" className="group inline-flex items-center justify-center gap-4 bg-white/20 text-white px-8 py-4 rounded-full font-normal transition-all duration-300 backdrop-blur-sm hover:bg-everest-gold hover:text-everest-green transform hover:scale-105 text-center">

                <span className="text-lg">View Our Menu</span>
              </Link>
              <Link href="/book-table" className="group inline-flex items-center justify-center gap-4 bg-everest-gold text-everest-green px-8 py-4 rounded-full font-normal transition-all duration-300 hover:bg-white hover:text-everest-green transform hover:scale-105 text-center">

                <span className="text-lg">Book a Table</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 
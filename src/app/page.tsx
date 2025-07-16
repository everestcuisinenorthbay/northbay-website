'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from '@/components/ui/Image';
import { useState, useEffect, useRef } from 'react';
import { getSiteSettings, SiteSettings } from '@/lib/api';

const dishes = [
  { src: '/dish1.png', alt: 'Dish 1' },
  { src: '/dish2.png', alt: 'Dish 2' },
  { src: '/dish3.png', alt: 'Dish 3' },
];

const reviews = [
  {
    id: 1,
    text: "Fantastic place for takeout. This was my first time having Nepalese food and I really liked it. The momos were fantastic, and Chicken 65 is a must if you like spicy food. The sushi is also outstanding! Staff are very friendly, and ordering by phone and picking up was seamless. Will order again!",
    author: "Eric Stacey",
    rating: 5,
  },
  {
    id: 2,
    text: "Absolutely loved our experience! We were blown away by how delicious everything was. We ordered soup and fried momos—both outstanding. Our server, Sima, was friendly, attentive, and even offered complimentary masala chai. When I forgot my headphones, she ran after us to return them. Incredible service and amazing food—we'll definitely be back!",
    author: "Danyyil Giba",
    rating: 5,
  },
  {
    id: 3,
    text: "Second time here. Had the veg tandoori momo first, and now the veg Pokhara Kothey (pan-fried) momo. Delicious and a little spicy, so the mango lassi—which is so tasty—helps. Portions are generous. Service is quick and always with a smile. The atmosphere is casual and welcoming. I will definitely return to try other items.",
    author: "Sonia Myre",
    rating: 5,
  },
  {
    id: 4,
    text: "I have gone here twice now and definitely want to go again! I love any kind of dumpling, and when I learned about momos I had to try some. Everest Cuisine is a cute spot and the serving of 10 momos is quite filling. The student menu portions are huge, so keep that in mind before ordering multiple things!",
    author: "Sara Robinson",
    rating: 5,
  },
];

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

// New animation variants
const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
      }
    }
  };

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMacbookSize, setIsMacbookSize] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const autoAdvanceTime = 7000;

  // Fetch site settings
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    
    fetchSiteSettings();
  }, []);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Check if device is in MacBook size range (1200-1500px)
    const checkMacbookSize = () => {
      console.log('window.innerWidth:', window.innerWidth);
      setIsMacbookSize(window.innerWidth >= 1200 && window.innerWidth <= 1500);
    };
    checkMacbookSize();
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      checkMacbookSize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const autoAdvanceCarousel = () => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    };
    
    const carouselInterval = setInterval(autoAdvanceCarousel, autoAdvanceTime);
    
    return () => clearInterval(carouselInterval);
  }, []);

  // Auto-advance reviews
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(reviewInterval);
  }, []);
  
  // Check if mobile based on state not direct window check
  const isMobile = windowWidth <= 640;
  
  return (
    <main className="min-h-screen w-full font-sans">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen md:max-lg:pb-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-bg.jpg"
            alt="Everest Cuisine Hero Background"
            fill
            priority
            className="object-cover object-center"
            wrapperClassName="absolute inset-0 w-full h-full"
          />
        </motion.div>
        {/* Overlay for readability */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-black/60 z-10 pointer-events-none" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        {/* Centered Hero Heading */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-50"
          variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
          <motion.h1 
            className="text-white font-normal leading-none font-serif mb-6 text-[5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem]"
            variants={fadeInUp}
          >
            {siteSettings?.heroTitle ? (
              <span>{siteSettings.heroTitle}</span>
            ) : (
              <>
                <span className="block md:inline">Taste </span>
                <span className="block md:inline">of Nepal</span>
              </>
            )}
            </motion.h1>
            <motion.p 
            className="text-white/80 text-sm sm:text-lg md:text-xl font-sans mb-8 tracking-wider px-4 sm:px-0"
              variants={fadeInUp}
            >
            {siteSettings?.heroSubtitle || (
              <>
                From the heart of the Himalayas to your table, experience the<br className="hidden sm:inline" />
                warmth, flavors, and stories of Nepal in every bite.
              </>
            )}
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center mb-8 bg-white/10 px-5 py-2 rounded-full backdrop-blur-sm"
              variants={fadeInUp}
            >
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const rating = siteSettings?.rating || 4.8;
                  const isFilledStar = star <= Math.floor(rating);
                  const isHalfStar = star === Math.ceil(rating) && rating % 1 !== 0;
                  
                  return (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={isFilledStar ? "#F7B241" : "none"} 
                      stroke={!isFilledStar ? "#F7B241" : "none"}
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  );
                })}
              </div>
              <span className="text-white font-semibold">{siteSettings?.rating || 4.8}</span>
              <span className="text-white/80 ml-1">•</span>
              <span className="text-white/80 ml-1">{siteSettings?.reviewCount || "800+"} {siteSettings?.ratingSource || "Google Reviews"}</span>
              </motion.div>
              
            <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center w-full px-8 sm:px-0 sm:w-auto"
            variants={fadeIn}
          >
            <motion.a 
              href={isMobile ? "https://app.kash4meexpress.com/everestcuisine/ec/book/" : "/menu"}
              target={isMobile ? "_blank" : ""}
              rel={isMobile ? "noopener noreferrer" : ""}
              className="inline-flex justify-center items-center w-full sm:w-[160px] py-5 sm:py-4 rounded-full bg-white/90 text-everest-green font-semibold text-lg hover:bg-everest-green hover:text-white transition-colors duration-300 shadow hover:shadow-lg touch-manipulation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                width: hoveredButton === "menu" && !isMobile ? 260 : 
                       hoveredButton === "book" && !isMobile ? 140 : 
                       isMobile ? "100%" : 160,
                scale: 1
              }}
              transition={{
                opacity: { delay: 1.2, duration: 0.6 },
                y: { delay: 1.2, duration: 0.6 },
                width: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                },
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => !isMobile && setHoveredButton("menu")}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <span className="block whitespace-nowrap">{isMobile ? "Order Now" : "View Menu"}</span>
            </motion.a>
            <motion.a 
                  href="/book-table" 
              className="inline-flex justify-center items-center w-full sm:w-[190px] py-5 sm:py-4 rounded-full bg-everest-green text-white font-semibold text-lg hover:bg-white hover:text-everest-green transition-colors duration-300 shadow hover:shadow-lg touch-manipulation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                width: hoveredButton === "book" && !isMobile ? 290 : 
                       hoveredButton === "menu" && !isMobile ? 160 : 
                       isMobile ? "100%" : 190,
                scale: 1
              }}
              transition={{
                opacity: { delay: 1.4, duration: 0.6 },
                y: { delay: 1.4, duration: 0.6 },
                width: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                },
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => !isMobile && setHoveredButton("book")}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <span className="block whitespace-nowrap">Book a Table</span>
            </motion.a>
              </motion.div>
            </motion.div>
      </section>

      {/* Carousel - Positioned to bridge hero and about sections */}
        <motion.div 
        className="relative -mt-60 sm:-mt-72 md:-mt-80 md:max-lg:-mt-[32rem] lg:-mt-96 z-30 flex justify-center items-center mb-[-2rem] sm:mb-[-1rem] md:mb-[0] pointer-events-none pb-8 sm:pb-10 overflow-x-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={isMacbookSize ? {
          marginTop: "-40rem", // Extreme value for testing
          paddingTop: "20rem",
        } : {}}
      >
        <div className="relative w-full max-w-7xl px-4 sm:px-8">
          {/* Carousel Container */}
          <motion.div 
            className="flex items-center justify-center h-[500px] sm:h-[550px] md:h-[520px] md:max-lg:h-[480px] lg:h-[700px] relative pointer-events-auto"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.02 }}
            transition={{ scale: { duration: 0.5, ease: "easeOut" } }}
          >
            {dishes.map((dish, index) => {
              // Calculate position relative to current index
              const position = ((index - carouselIndex) % dishes.length + dishes.length) % dishes.length;
              const isCenter = position === 0;
              const isLeft = position === dishes.length - 1;
              const isRight = position === 1;
              
              // Skip images that aren't in view (for 3 images only)
              if (dishes.length > 3 && !isCenter && !isLeft && !isRight) return null;
              
              // Calculate position and opacity
              let xPosition = 0;
              let scale = 0.55;
              let zIndex = 0;
              let opacity = 0;
              
              if (isCenter) {
                xPosition = 0;
                scale = isMobile ? 0.95 : 0.85; // Slightly larger on mobile
                zIndex = 3;
                opacity = 1;
              } else if (isLeft) {
                xPosition = -320;
                zIndex = 1;
              } else if (isRight) {
                xPosition = 320;
                zIndex = 1;
              }
              
              return (
                <motion.div
                  key={dish.src}
                  className="absolute flex items-center justify-center"
                  style={{ 
                    zIndex,
                  }}
                  initial={false}
                  animate={{
                    x: xPosition,
                    scale,
                    opacity,
                    rotate: isCenter ? [0, 1, 0, -1, 0] : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 38,
                    rotate: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Image
                    src={dish.src}
                    alt={dish.alt}
                    width={750}
                    height={750}
                    className="object-contain pointer-events-none select-none"
                    wrapperClassName="relative"
                  />
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Navigation Dots - Removed */}
        </div>
        </motion.div>
        
      {/* Chef's Section */}
      <section className="w-full bg-beige pt-0 -mt-4 pb-24 sm:pt-12 sm:mt-0 sm:pb-32 md:pt-0 md:pb-36">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="mt-0 md:mt-0 order-first md:order-last h-full flex items-center">
              {/* Chef's image */}
              <motion.div 
                className="relative w-full h-full aspect-[6/5] max-w-sm mx-auto md:max-w-none rounded-lg overflow-hidden shadow-xl"
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src="/chef-hero.jpg"
                  alt="Chef Rajesh Sherpa"
                  fill
                  className="object-cover object-center w-full h-full"
                  wrapperClassName="relative w-full h-full aspect-[6/5] max-w-sm mx-auto md:max-w-none rounded-lg overflow-hidden shadow-xl"
                />
                <div className="absolute inset-0 bg-everest-green/10 hover:bg-everest-green/0 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-everest-green/40 to-transparent"></div>
              </motion.div>
            </div>
            <motion.div 
              className="text-center md:text-left flex flex-col justify-center h-full mt-2 md:mt-0"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-everest-green mb-4 md:mb-6"
                variants={fadeInUp}
              >
                Meet Our Chef
              </motion.h2>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                Born and raised in Kathmandu, Nepal, Chef Sagar Shrestha's culinary journey began in his mother's kitchen. 
                With over 25 years of experience, he has mastered the art of Nepalese and Indian cuisine through formal 
                training at Nepal Academy of Tourism and Hotel Management.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                His passion for culinary excellence has taken him across the globe - from Saudi Arabia and Kuwait to Japan, 
                where he mastered the art of sushi. His European training at Capo Bay Hotel in Cyprus further refined his 
                skills, leading to his current role at Everest Cuisine, where he brings together his diverse culinary 
                experiences to create authentic and innovative dishes.
              </motion.p>
              <motion.p 
                className="text-slate-700 italic mb-6"
                variants={fadeInUp}
              >
                "Every dish we serve is a reflection of my journey - from the streets of Kathmandu to the finest 
                restaurants across the world. I invite you to experience the authentic flavors of Nepal, crafted 
                with passion and precision."
              </motion.p>
              <motion.div 
                className="flex items-center justify-center md:justify-start"
                variants={fadeInUp}
              >
                <div className="w-12 h-1 bg-everest-green mr-3"></div>
                <p className="text-everest-green font-semibold">Chef Sagar Shrestha</p>
              </motion.div>
              <motion.a 
                href="/about-us" 
                className="inline-flex items-center text-everest-green font-medium hover:text-everest-gold transition-colors mt-6"
                whileHover={{ x: 5 }}
                variants={fadeInUp}
              >
                Learn more about our team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
      
      {/* Reviews Section */}
      <section className="w-full bg-everest-green/95 py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Large background quotation marks */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <span className="absolute left-8 sm:left-20 md:left-32 top-20 text-[180px] sm:text-[250px] md:text-[350px] text-everest-cream/5 font-['Georgia'] leading-none">&ldquo;</span>
          <span className="absolute right-8 sm:right-20 md:right-32 bottom-10 text-[180px] sm:text-[250px] md:text-[350px] text-everest-cream/5 font-['Georgia'] leading-none">&rdquo;</span>
        </motion.div>
        
        <div className="container mx-auto px-6 md:px-8 max-w-6xl relative">
          {/* Decorative Elements */}
          
          <motion.div 
            className="text-center mb-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4"
              variants={fadeInUp}
            >
              What Our Guests Say
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-everest-gold mx-auto"
              variants={scaleUp}
            ></motion.div>
            <motion.div 
              className="text-everest-cream/60 text-xs mt-2" 
              style={{fontSize: '0.7rem'}}
              variants={fadeIn}
            >
              from Google Reviews
            </motion.div>
          </motion.div>
          
                <div className="relative">
            <AnimatePresence mode="wait">
              {reviews.map((review, index) => (
                reviewIndex === index && (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative max-w-3xl w-full mx-auto mb-6 p-8 sm:p-10">
                      <p className="text-lg sm:text-xl text-everest-cream/90 text-center relative z-10">
                        {review.text}
                      </p>
                    </div>
                    <motion.div 
                      className="flex items-center flex-col sm:flex-row mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="text-center sm:text-left">
                        <p className="text-everest-cream font-semibold text-lg">{review.author}</p>
                        <div className="flex items-center justify-center sm:justify-start mt-1">
                          {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                              className={`w-5 h-5 ${i < review.rating ? "text-everest-gold" : "text-gray-400"}`} 
                              fill="currentColor" 
                            viewBox="0 0 20 20" 
                          >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <motion.div 
              className="flex justify-center space-x-2 mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {reviews.map((_, index) => (
                <button
                        key={index}
                  onClick={() => setReviewIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    index === reviewIndex 
                      ? 'bg-everest-gold scale-125' 
                      : 'bg-everest-cream/40 hover:bg-everest-cream/60'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
            </motion.div>
          </div>
        </div>
      </section>


{/* Gift Card Banner */}
<section className="w-full bg-white py-16 sm:py-20 relative overflow-hidden">
  <div className="container mx-auto px-6 max-w-6xl">
    <motion.div 
      className="bg-gradient-to-r from-everest-gold/10 to-everest-green/10 rounded-2xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-everest-green mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Give the Gift of<br />Nepalese Cuisine
          </motion.h2>
          <motion.p 
            className="text-slate-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Perfect for birthdays, anniversaries, or just to say thank you.
            Our gift cards are available in various denominations and can be used for dine-in or takeout.
          </motion.p>
          <motion.a 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-everest-green text-white rounded-full text-lg font-medium hover:bg-everest-gold transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto sm:inline-flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Purchase Gift Card
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
        <div className="relative h-64 md:h-auto flex justify-end items-center">
          <div className="relative w-full md:w-5/6 h-full overflow-hidden">
            <Image
              src="/rem-bg.jpg"
              alt="Everest Cuisine Gift Card"
              fill
              className="object-cover object-right"
              wrapperClassName="h-full w-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* Remember Us For Section - Styled differently from menu page */}
<section className="w-full bg-beige py-16 sm:py-20 relative overflow-hidden">
  <div className="container mx-auto px-6 max-w-6xl">
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-everest-green mb-4">More Than Just Food</h2>
      <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
      <p className="text-slate-700 max-w-2xl mx-auto">
        We offer a variety of services beyond our delicious food
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <motion.div 
        className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="mb-4 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-everest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="font-serif text-everest-green text-xl mb-2">Catering</h3>
        <p className="text-slate-600 text-sm">Authentic Nepalese flavors for your special events</p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="mb-4 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-everest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-serif text-everest-green text-xl mb-2">Event Services</h3>
        <p className="text-slate-600 text-sm">Full-service event planning and execution</p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="mb-4 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-everest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="font-serif text-everest-green text-xl mb-2">Frozen Mo:Mo</h3>
        <p className="text-slate-600 text-sm">Take-home dumplings to enjoy anytime</p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <div className="mb-4 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-everest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 className="font-serif text-everest-green text-xl mb-2">Nepali Spices</h3>
        <p className="text-slate-600 text-sm">Authentic spices imported from Nepal</p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <div className="mb-4 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-everest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
        <h3 className="font-serif text-everest-green text-xl mb-2">Nepali Souvenirs</h3>
        <p className="text-slate-600 text-sm">Authentic crafts and keepsakes from Nepal</p>
      </motion.div>
    </div>
    
    <motion.div 
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <a 
        href="tel:613-963-4406" 
        className="inline-flex items-center justify-center px-8 py-4 bg-everest-green text-white rounded-full text-lg font-medium hover:bg-everest-gold transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call 613-963-4406 for inquiries
      </a>
    </motion.div>
  </div>
</section>

      
    </main>
  );
}

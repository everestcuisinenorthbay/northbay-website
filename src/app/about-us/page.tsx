'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
            Everest Cuisine is a Indo-Nepalese restaurant and sushi bar in Ottawa, open late and always welcoming. From Himalayan thalis to fiery Manchurian, from momos to maki, we bring together the bold.
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
                A Taste of the Himalayas (and Beyond)
              </motion.h3>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                Our kitchen reflects the range and richness of Himalayan flavors, with a few surprises along the way. Start with spicy Wai Wai Sadheko or crunchy Gobi 65, then dive into a comforting bowl of thukpa or a full Nepali thali with goat curry, rayo saag, and aloo ko achar.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                We specialize in authentic Nepali momos: steamed, fried, tandoori, kothey, or jhol, served with house-made sauces and spice blends. But the journey doesn&apos;t end there. Our Indo-Chinese lineup features favorites like Hakka chowmein, chicken chilli, and Gobi Manchurian, all wok-tossed and deeply satisfying.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                Craving sushi? Our Everest Killer Roll and Tokyo Sushi Platter blend Japanese technique with bold flavor, made fresh, in-house. And for something quick and hearty, our momo and chowmein wraps offer the perfect fusion bite.
              </motion.p>
              <motion.p 
                className="text-slate-700"
                variants={fadeInUp}
              >
                At Everest, it&apos;s all made from scratch. Big portions, honest prices, late-night hours. Whether you&apos;re here for a full Nepali meal, spicy street-style chowmein, or a quick lassi and snack, we&apos;ve got something with your name on it.
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
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif text-everest-green mb-4">Meet Our Chef</h2>
            <div className="w-24 h-1 bg-everest-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.div 
                className="relative rounded-lg overflow-hidden shadow-xl"
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
                  className="object-cover w-full aspect-[4/5]"
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="order-1 md:order-2 text-center md:text-left"
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
                className="w-16 h-1 bg-everest-gold mb-6 mx-auto md:mx-0"
                variants={fadeInUp}
              />
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                Born and raised in Kathmandu, Nepal, Chef Sagar Shrestha&apos;s culinary journey began in his mother&apos;s kitchen. With over 25 years of experience, he has mastered the art of Nepalese and Indian cuisine through formal training at Nepal Academy of Tourism and Hotel Management.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                His passion for culinary excellence has taken him across the globe - from Saudi Arabia and Kuwait to Japan, where he mastered the art of sushi. His European training at Capo Bay Hotel in Cyprus further refined his skills. After moving to Canada nearly 9 years ago, Sagar worked in prestigious establishments like Kizuna Japanese Fine Cuisine, Hilton Hotel Saint John, Kasa Moto, and Miku Toronto.
              </motion.p>
              <motion.p 
                className="text-slate-700 mb-4"
                variants={fadeInUp}
              >
                At Everest Cuisine, Chef Sagar brings together his diverse culinary experiences to create dishes that honor traditional Nepalese cooking while incorporating innovative techniques from his international training. His expertise in both Nepalese and Indian cuisine allows him to create a menu that showcases the best of both culinary traditions, from the delicate flavors of momos to the rich, complex curries.
              </motion.p>
              <motion.p 
                className="text-slate-700 italic"
                variants={fadeInUp}
              >
                &quot;Every dish we serve is a reflection of my journey - from the streets of Kathmandu to the finest restaurants across the world. I invite you to experience the authentic flavors of Nepal, crafted with passion and precision.&quot;
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="w-full bg-beige py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif text-everest-green mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
            <p className="text-slate-700 max-w-3xl mx-auto">
              Behind every exceptional dining experience is a dedicated team working tirelessly to bring you the best in Nepalese cuisine and hospitality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[1/1] relative">
                <Image
                  src="/Ramesh-Baniya.jpg"
                  alt="Ramesh Baniya"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-everest-green mb-1">Ramesh Baniya</h3>
                <p className="text-everest-gold font-medium mb-3">Proprietor/Restaurant Manager</p>
                <p className="text-slate-700 text-sm">
                  As a part owner and manager with years of experience in hospitality, Ramesh brings his expertise and passion to ensure every aspect of your dining experience exceeds expectations.
                </p>
              </div>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[1/1] relative">
                <Image
                  src="/team-2.jpg"
                  alt="Sous Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-everest-green mb-1">Ajay Sharma</h3>
                <p className="text-everest-gold font-medium mb-3">Sous Chef</p>
                <p className="text-slate-700 text-sm">
                  With extensive training under Chef Sagar&apos;s mentorship, Ajay combines traditional Nepalese cooking techniques with innovative approaches, ensuring each dish that leaves our kitchen is authetic.
                </p>
              </div>
            </motion.div>
            
            {/* Team Member 3 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[1/1] relative">
                <Image
                  src="/team-3.jpg"
                  alt="Service Lead"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-everest-green mb-1">Sheetal Rijal</h3>
                <p className="text-everest-gold font-medium mb-3">Service Lead</p>
                <p className="text-slate-700 text-sm">
                  Sheetal&apos;s warm personality and attention to detail make her an invaluable part of our front-of-house team, ensuring every guest receives personalized service and leaves with a memorable dining experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
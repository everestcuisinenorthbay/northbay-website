"use client";
import MenuCard from '@/components/ui/MenuCard';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getMenuCategories, getAllMenuItems } from '@/lib/api';
import { urlFor } from '@/lib/sanity';
import { MenuCategory, MenuItem } from '@/types/sanity';

interface MenuItemWithCategory extends MenuItem {
  category: string;
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    spicy: false,
    glutenFree: false,
  });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc'>('name-asc');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItemWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMenuData() {
      try {
        setIsLoading(true);
        const categories = await getMenuCategories();
        const items = await getAllMenuItems();
        
        console.log('Fetched categories:', categories);
        console.log('Fetched items:', items);
        
        setMenuCategories(categories);
        setAllMenuItems(items as MenuItemWithCategory[]);
        
        // Set the first category as expanded by default
        if (categories.length > 0) {
          setExpandedCategories([categories[0]._id]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setIsLoading(false);
      }
    }
    
    fetchMenuData();
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return allMenuItems
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        
        const matchesDietary = (!dietaryFilters.vegetarian || item.isVegetarian) &&
                             (!dietaryFilters.spicy || item.isSpicy) &&
                             (!dietaryFilters.glutenFree || item.isGlutenFree);

        return matchesSearch && matchesPrice && matchesDietary;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [allMenuItems, searchQuery, priceRange, dietaryFilters, sortBy]);

  // Group filtered items by category, preserving the order in menuCategories
  const filteredCategories = useMemo(() => {
    return menuCategories
      .map((category) => ({
        ...category,
        menuItems: filteredItems.filter(item => item.category === category.name)
      }))
      .filter(category => category.menuItems.length > 0);
  }, [filteredItems, menuCategories]);

  // useEffect block here
  useEffect(() => {
    const isDefault =
      !searchQuery &&
      priceRange[0] === 0 && priceRange[1] === 50 &&
      !dietaryFilters.vegetarian &&
      !dietaryFilters.spicy &&
      !dietaryFilters.glutenFree &&
      sortBy === 'name-asc';
    
    if (isDefault && menuCategories.length > 0) {
      setExpandedCategories([menuCategories[0]._id]);
    } else if (filteredCategories.length > 0) {
      setExpandedCategories(filteredCategories.map(category => category._id));
    }
  }, [searchQuery, priceRange, dietaryFilters, sortBy, filteredCategories, menuCategories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="bg-[#FFF9F0] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#5C4033]">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-screen-xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-normal mb-6 text-[#2C1810] font-baskerville">Our Menu</h1>
          <div className="w-24 h-1 bg-[#D4A373] mx-auto mb-8"></div>
          <p className="text-lg text-[#5C4033] max-w-2xl mx-auto font-geist">
            Experience the authentic flavors of Nepal and India, alongside our fresh Sushi selections. 
            Each dish is crafted with care using traditional recipes and locally-sourced ingredients.
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-12 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-3 bg-white/30 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg w-full" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            {/* Row 1 on Mobile / Left section on Desktop */}
            <div className="flex flex-col sm:flex-row gap-3 md:flex-1">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/70 text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all duration-300 shadow-none border-none text-sm"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C4033]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Dietary Filters - Only on Mobile Row 1 */}
              <div className="flex gap-2 sm:hidden">
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.vegetarian ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                  }`}
                >
                  Veg
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, spicy: !prev.spicy }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.spicy ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                  }`}
                >
                  Spicy
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, glutenFree: !prev.glutenFree }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.glutenFree ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  GF
                </button>
              </div>
            </div>
            
            {/* Row 2 on Mobile / Right section on Desktop */}
            <div className="flex gap-3 md:flex-1 md:justify-end items-center">
              {/* Dietary Filters - Only on Desktop */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.vegetarian ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                  }`}
                >
              Vegetarian
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, spicy: !prev.spicy }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.spicy ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                  }`}
                >
              Spicy
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, glutenFree: !prev.glutenFree }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.glutenFree ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
              Gluten Free
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-white/70 text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all duration-300 shadow-none border-none"
                style={{ minWidth: 130 }}
              >
                <option value="name-asc">Sort: A-Z</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-medium text-[#2C1810]">
                  ${priceRange[0]}-${priceRange[1]}
            </span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-[#D4A373]/30 rounded-lg appearance-none cursor-pointer border-none"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Menu Categories */}
        {filteredCategories.map((category) => (
          <section key={category._id} className="mb-4">
            <div 
              className="flex items-center justify-between py-6 px-4 bg-white/40 backdrop-blur-sm rounded-xl cursor-pointer border border-[#D4A373]/10 transition-all duration-300 hover:bg-white/50"
              onClick={() => toggleCategory(category._id)}
            >
              <h2 className="text-2xl font-normal text-[#2C1810] font-baskerville">
                {category.name}
                <span className="text-[#D4A373] ml-2 text-base">
                  ({category.menuItems.length} items)
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <svg 
                  className={`w-6 h-6 text-[#D4A373] transition-transform duration-300 ${expandedCategories.includes(category._id) ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Menu Grid */}
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 transition-all duration-500 overflow-hidden ${
                expandedCategories.includes(category._id) 
                  ? 'max-h-[5000px] opacity-100' 
                  : 'max-h-0 opacity-0 hidden'
              }`}
            >
              {category.menuItems.map((item) => (
                <MenuCard
                  key={item._id}
                  name={item.name}
                  description={item.description}
                  price={`$${item.price.toFixed(2)}`}
                  isVegetarian={item.isVegetarian}
                  isSpicy={item.isSpicy}
                  isGlutenFree={item.isGlutenFree}
                  image={item.image ? urlFor(item.image).url() : undefined}
                  className="text-sm"
                />
              ))}
            </div>
          </section>
        ))}
        
        {/* Allergy Information */}
        <div className="mt-16 p-8 bg-white rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-normal mb-4 text-amber-900 font-baskerville">Allergy Information</h2>
            <p className="text-gray-700 font-geist">
            We take food allergies seriously. Our menu items may contain or come into contact with wheat, eggs, nuts, and milk. 
            Please inform our staff about any allergies or dietary restrictions before ordering.
          </p>
          <div className="mt-4">
              <a href="#" className="text-amber-700 font-normal hover:text-amber-500 transition-colors font-geist">
              Contact us for special dietary requests →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Order Now Button */}
      <div className="text-center py-12 pb-24">
        <motion.a
          href="https://app.kash4meexpress.com/everestcuisine/ec/book"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-everest-green text-white rounded-full text-lg font-medium hover:bg-everest-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.a>
        </div>
        
      {/* Remember Us Banner */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/rem-bg.jpg"
            alt="Remember Us For Background"
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
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Remember Us For</h2>
              <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
              <p className="text-white/95 font-sans max-w-2xl mx-auto text-lg">
                We offer more than just dining - explore our additional services
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Catering</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Event Services</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Frozen Mo:Mo</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Nepali Spices</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Nepali Souvenirs</span>
            </div>
          </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us at 613-963-4406 for catering or event inquiries
              </span>
            </motion.div>
              </div>
        </div>
      </div>
    </div>
  );
} 
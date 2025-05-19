'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  isGlutenFree: boolean;
  image?: any;
  category: string;
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all menu items and categories
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        
        // Fetch all menu items
        const query = `
          *[_type == "menuItem"] | order(name asc) {
            _id,
            name,
            description,
            price,
            image,
            isVegetarian,
            isSpicy,
            isGlutenFree,
            "category": category->name
          }
        `;
        
        const result = await sanityClient.fetch(query);
        setMenuItems(result);
        setFilteredItems(result);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(result.map((item: MenuItem) => item.category))
        ).filter(Boolean) as string[];
        
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError('Failed to load menu items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...menuItems];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply dietary filter
    if (dietaryFilter === 'vegetarian') {
      result = result.filter(item => item.isVegetarian);
    } else if (dietaryFilter === 'spicy') {
      result = result.filter(item => item.isSpicy);
    } else if (dietaryFilter === 'gluten-free') {
      result = result.filter(item => item.isGlutenFree);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(result);
    setPage(1); // Reset to first page when filters change
  }, [menuItems, categoryFilter, dietaryFilter, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Format price to display as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-gray-600 mt-1">View and manage all menu items.</p>
      </header>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="spicy">Spicy</option>
              <option value="gluten-free">Gluten Free</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => {
              setCategoryFilter('all');
              setDietaryFilter('all');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Quick Add Button */}
      <div className="mb-6 flex justify-end">
        <a
          href="/studio/desk/menuItem;new"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-everest-green text-white px-4 py-2 rounded-md hover:bg-everest-gold transition-colors flex items-center"
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Add New Menu Item
        </a>
      </div>
      
      {/* Menu Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-everest-green"></div>
        </div>
      ) : displayedItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No menu items found matching your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {displayedItems.map((item, index) => (
              <div key={item._id} className={`p-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex">
                  {/* Item Image */}
                  <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100 mr-4">
                    {item.image ? (
                      <img
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <span className="font-bold text-everest-green">{formatPrice(item.price)}</span>
                    </div>
                    
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Category: {item.category}</span>
                      
                      {item.isVegetarian && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Veg</span>
                      )}
                      
                      {item.isSpicy && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">Spicy</span>
                      )}
                      
                      {item.isGlutenFree && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">GF</span>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <a
                        href={`/studio/desk/menuItem;${item._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-everest-green hover:text-everest-gold transition-colors flex items-center"
                      >
                        <PencilIcon className="h-3 w-3 mr-1" />
                        Edit in Studio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between items-center">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-2" />
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
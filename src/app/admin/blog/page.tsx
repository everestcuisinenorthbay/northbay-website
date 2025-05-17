'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { urlFor } from '@/lib/sanity';

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
    image?: any;
  };
  mainImage?: any;
  categories: Array<{
    title: string;
    color: string;
  }>;
}

interface BlogCategory {
  _id: string;
  title: string;
  color: string;
}

export default function BlogManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch all blog posts and categories
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch all categories
        const categoriesQuery = `
          *[_type == "category"] | order(title asc) {
            _id,
            title,
            color
          }
        `;
        
        const categoriesResult = await sanityClient.fetch(categoriesQuery);
        setCategories(categoriesResult);
        
        // Fetch all blog posts
        const postsQuery = `
          *[_type == "blogPost"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            publishedAt,
            excerpt,
            mainImage,
            author->{
              name,
              image
            },
            categories[]->{
              title,
              color
            }
          }
        `;
        
        const postsResult = await sanityClient.fetch(postsQuery);
        setBlogPosts(postsResult);
        setFilteredPosts(postsResult);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...blogPosts];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(post => 
        post.categories && post.categories.some(category => category.title === categoryFilter)
      );
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          (post.author?.name && post.author.name.toLowerCase().includes(term))
      );
    }
    
    setFilteredPosts(result);
    setPage(1); // Reset to first page when filters change
  }, [blogPosts, categoryFilter, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <p className="text-gray-600 mt-1">View and manage all blog posts.</p>
      </header>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search blog posts..."
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
          href="/studio/desk/blogPost;new"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-everest-green text-white px-4 py-2 rounded-md hover:bg-everest-gold transition-colors flex items-center"
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Add New Blog Post
        </a>
      </div>
      
      {/* Blog Posts Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-everest-green"></div>
        </div>
      ) : displayedPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No blog posts found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              {/* Post Image */}
              <div className="h-48 bg-gray-100 relative">
                {post.mainImage ? (
                  <img
                    src={urlFor(post.mainImage).width(400).height(200).url()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(post.categories || []).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: category.color ? `${category.color}20` : '#e5e7eb',
                        color: category.color || '#4b5563'
                      }}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                
                {/* Post Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                
                {/* Excerpt */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{post.excerpt}</p>
                
                {/* Author and Date */}
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{post.author?.name || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <a
                    href={`/blog/${post.slug.current}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View Post
                  </a>
                  
                  <a
                    href={`/studio/desk/blogPost;${post._id}`}
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
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
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
  );
} 
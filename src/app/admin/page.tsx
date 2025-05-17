'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  todayBookings: number;
  thisWeekBookings: number;
  totalMenuItems: number;
  totalCategories: number;
  totalBlogPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get today's date in ISO format (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
        
        // Get date 7 days from now
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const nextWeekStr = nextWeek.toISOString().split('T')[0];
        
        // Fetch all stats in a single query
        const query = `{
          "totalBookings": count(*[_type == "tableBooking"]),
          "pendingBookings": count(*[_type == "tableBooking" && status == "pending"]),
          "confirmedBookings": count(*[_type == "tableBooking" && status == "confirmed"]),
          "todayBookings": count(*[_type == "tableBooking" && date == $today]),
          "thisWeekBookings": count(*[_type == "tableBooking" && date >= $today && date <= $nextWeek]),
          "totalMenuItems": count(*[_type == "menuItem"]),
          "totalCategories": count(*[_type == "menuCategory"]),
          "totalBlogPosts": count(*[_type == "blogPost"])
        }`;
        
        const result = await sanityClient.fetch(query, { today, nextWeek: nextWeekStr });
        setStats(result);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    { title: 'Total Bookings', value: stats?.totalBookings || 0, bgColor: 'bg-blue-500' },
    { title: 'Pending Bookings', value: stats?.pendingBookings || 0, bgColor: 'bg-yellow-500' },
    { title: 'Confirmed Bookings', value: stats?.confirmedBookings || 0, bgColor: 'bg-green-500' },
    { title: 'Today\'s Bookings', value: stats?.todayBookings || 0, bgColor: 'bg-purple-500' },
    { title: 'Next 7 Days', value: stats?.thisWeekBookings || 0, bgColor: 'bg-indigo-500' },
    { title: 'Menu Items', value: stats?.totalMenuItems || 0, bgColor: 'bg-orange-500' },
    { title: 'Menu Categories', value: stats?.totalCategories || 0, bgColor: 'bg-teal-500' },
    { title: 'Blog Posts', value: stats?.totalBlogPosts || 0, bgColor: 'bg-pink-500' },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the restaurant management dashboard.</p>
      </header>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-everest-green"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div 
                key={index} 
                className={`${card.bgColor} text-white rounded-lg shadow-md p-6 transition-transform hover:scale-105`}
              >
                <h2 className="text-lg font-medium opacity-80">{card.title}</h2>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h2>
              <div className="space-y-4">
                <a 
                  href="/admin/bookings" 
                  className="block w-full py-3 px-4 bg-everest-green text-white text-center rounded-lg hover:bg-everest-gold transition-colors duration-200"
                >
                  Manage Bookings
                </a>
                <a 
                  href="/admin/menu" 
                  className="block w-full py-3 px-4 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Manage Menu Items
                </a>
                <a 
                  href="/admin/blog" 
                  className="block w-full py-3 px-4 bg-pink-500 text-white text-center rounded-lg hover:bg-pink-600 transition-colors duration-200"
                >
                  Manage Blog Posts
                </a>
                <a 
                  href="/studio" 
                  className="block w-full py-3 px-4 bg-gray-700 text-white text-center rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Open Sanity Studio
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Activity</h2>
              <p className="text-gray-600">
                View and manage recent bookings in the bookings section. You can confirm, cancel, 
                or update booking status there.
              </p>
              <div className="mt-4">
                <a 
                  href="/admin/bookings" 
                  className="text-everest-green hover:text-everest-gold transition-colors duration-200"
                >
                  View all bookings →
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 
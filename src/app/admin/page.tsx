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
    { 
      title: 'Total Bookings', 
      value: stats?.totalBookings || 0, 
      bgColor: 'from-blue-500 to-blue-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    { 
      title: 'Pending Bookings', 
      value: stats?.pendingBookings || 0, 
      bgColor: 'from-amber-500 to-amber-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Confirmed Bookings', 
      value: stats?.confirmedBookings || 0, 
      bgColor: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Today\'s Bookings', 
      value: stats?.todayBookings || 0, 
      bgColor: 'from-purple-500 to-purple-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M9 14.25v-2.25m0 0V8.75m0 3.75h3" />
        </svg>
      )
    },
    { 
      title: 'Next 7 Days', 
      value: stats?.thisWeekBookings || 0, 
      bgColor: 'from-indigo-500 to-indigo-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M9 14.25v-2.25m0 0V8.75m0 3.75h3m3 0H9m3 0V8.75m0 0v2.25" />
        </svg>
      )
    },
    { 
      title: 'Menu Items', 
      value: stats?.totalMenuItems || 0, 
      bgColor: 'from-orange-500 to-orange-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M6.75 17.25l3-3m3 3l-3-3" />
        </svg>
      )
    },
    { 
      title: 'Menu Categories', 
      value: stats?.totalCategories || 0, 
      bgColor: 'from-teal-500 to-teal-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    { 
      title: 'Blog Posts', 
      value: stats?.totalBlogPosts || 0, 
      bgColor: 'from-rose-500 to-rose-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-r from-everest-green to-emerald-800 p-8 rounded-2xl shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-emerald-100 mt-2 max-w-2xl">
            Welcome to the Everest Cuisine restaurant management dashboard. View stats and manage your content.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-64 h-64 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
      </div>
      
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-everest-green mb-4"></div>
            <p className="text-gray-500">Loading dashboard statistics...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${card.bgColor} text-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
              >
                <div className="flex items-center p-6">
                  <div className="mr-4 bg-white/20 rounded-lg p-3 group-hover:bg-white/30 transition-all duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium opacity-90">{card.title}</h2>
                    <p className="text-3xl font-bold mt-1 flex items-baseline">
                      {card.value}
                      <span className="ml-1 text-sm opacity-70">total</span>
                    </p>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/20"></div>
              </div>
            ))}
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b border-gray-100 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-everest-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Quick Actions
              </h2>
              <div className="space-y-4">
                <a 
                  href="/admin/bookings" 
                  className="group flex items-center justify-between w-full py-3 px-4 bg-white border border-everest-green text-everest-green font-medium text-center rounded-lg hover:bg-everest-green hover:text-white transition-all duration-200"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Manage Bookings
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a 
                  href="/admin/menu" 
                  className="group flex items-center justify-between w-full py-3 px-4 bg-white border border-orange-500 text-orange-500 font-medium text-center rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513" />
                    </svg>
                    Manage Menu Items
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a 
                  href="/admin/blog" 
                  className="group flex items-center justify-between w-full py-3 px-4 bg-white border border-rose-500 text-rose-500 font-medium text-center rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-200"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5" />
                    </svg>
                    Manage Blog Posts
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a 
                  href="/studio" 
                  className="group flex items-center justify-between w-full py-3 px-4 bg-white border border-gray-700 text-gray-700 font-medium text-center rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5" />
                    </svg>
                    Open Sanity Studio
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Recent Activity Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b border-gray-100 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-everest-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                Recent Activity
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">
                      View and manage recent bookings in the bookings section. You can confirm, cancel, 
                      or update booking status there.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center">
                  <div className="bg-orange-100 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">
                      Update your menu items and categories in the menu section to showcase your delicious dishes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
                <a 
                  href="/admin/bookings" 
                  className="inline-flex items-center text-everest-green hover:text-everest-gold transition-colors duration-200 font-medium"
                >
                  View all bookings
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* System Info Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b border-gray-100 pb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-everest-green">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              System Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-500 font-medium text-sm mb-1">System Status</h3>
                <p className="flex items-center text-gray-800 font-bold">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Operational
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-500 font-medium text-sm mb-1">Environment</h3>
                <p className="text-gray-800 font-bold">Production</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-500 font-medium text-sm mb-1">Last Deployed</h3>
                <p className="text-gray-800 font-bold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 
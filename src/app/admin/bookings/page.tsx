'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  occasion: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface DateFilter {
  startDate: string;
  endDate: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    startDate: '',
    endDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [updateLoading, setUpdateLoading] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        const query = `
          *[_type == "tableBooking"] | order(date desc, time desc) {
            _id,
            name,
            email,
            phone,
            date,
            time,
            partySize,
            occasion,
            notes,
            status,
            createdAt,
            updatedAt
          }
        `;
        
        const result = await sanityClient.fetch(query);
        setBookings(result);
        setFilteredBookings(result);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...bookings];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter.startDate) {
      result = result.filter(booking => booking.date >= dateFilter.startDate);
    }
    if (dateFilter.endDate) {
      result = result.filter(booking => booking.date <= dateFilter.endDate);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        booking => 
          booking.name.toLowerCase().includes(term) ||
          booking.email.toLowerCase().includes(term) ||
          booking.phone.includes(term)
      );
    }
    
    setFilteredBookings(result);
    setPage(1); // Reset to first page when filters change
  }, [bookings, statusFilter, dateFilter, searchTerm]);

  // Handle status update
  const handleUpdateStatus = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      setUpdateLoading(prev => ({ ...prev, [bookingId]: true }));

      const response = await fetch('/api/update-booking-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Unknown error');

      // Show notification based on status
      let notificationMessage = '';
      if (newStatus === 'confirmed') {
        notificationMessage = 'Booking confirmed! A confirmation email will be sent to the customer.';
      } else if (newStatus === 'cancelled') {
        notificationMessage = 'Booking cancelled.';
      } else if (newStatus === 'completed') {
        notificationMessage = 'Booking marked as completed.';
      }

      // Update local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: newStatus, updatedAt: new Date().toISOString() }
            : booking
        )
      );

      // Show success notification
      alert(notificationMessage);
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status. Please try again.');
    } finally {
      setUpdateLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  // Status badge color mapping
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all table bookings.</p>
      </header>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={dateFilter.startDate}
              onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Name, email, or phone"
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
              setStatusFilter('all');
              setDateFilter({ startDate: '', endDate: '' });
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Bookings Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-everest-green"></div>
        </div>
      ) : displayedBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No bookings found matching your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedBookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                      <div className="text-sm text-gray-500">Time: {booking.time}</div>
                      <div className="text-sm text-gray-500">Party: {booking.partySize} {booking.partySize === 1 ? 'person' : 'people'}</div>
                      {booking.occasion && (
                        <div className="text-sm text-gray-500">Occasion: {booking.occasion}</div>
                      )}
                      {booking.notes && (
                        <div className="text-sm text-gray-500 max-w-xs truncate" title={booking.notes}>
                          Note: {booking.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                            className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50"
                            disabled={updateLoading[booking._id]}
                            title="Confirm Booking"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                            disabled={updateLoading[booking._id]}
                            title="Cancel Booking"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'completed')}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
                            disabled={updateLoading[booking._id]}
                            title="Mark as Completed"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {booking.status === 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'pending')}
                            className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-50"
                            disabled={updateLoading[booking._id]}
                            title="Revert to Pending"
                          >
                            <ClockIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
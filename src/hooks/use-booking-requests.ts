
import { useState, useEffect, useCallback } from 'react';
import { fetchBookingRequests, updateBookingStatus, deleteBookingRequest } from '@/utils/bookingUtils';

export type BookingRequestStatus = 'all' | 'new' | 'contacted' | 'confirmed' | 'cancelled';

export interface BookingRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

export const useBookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingRequestStatus>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookingRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchBookingRequests();
      
      if (result.success && result.data) {
        setBookingRequests(result.data as BookingRequest[]);
      } else {
        setError(result.error || 'Failed to load booking requests');
      }
    } catch (err) {
      setError('An unexpected error occurred while loading booking requests');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter bookings based on status
  const filteredBookingRequests = useCallback(() => {
    if (statusFilter === 'all') {
      return bookingRequests;
    }
    return bookingRequests.filter(booking => booking.status === statusFilter);
  }, [bookingRequests, statusFilter]);

  // Handle status change
  const handleStatusChange = useCallback(async (bookingId: string, newStatus: string) => {
    try {
      const result = await updateBookingStatus(bookingId, newStatus);
      
      if (result.success) {
        // Update local state
        setBookingRequests(prev => 
          prev.map(booking => 
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        return true;
      } else {
        setError(result.error || 'Failed to update booking status');
        return false;
      }
    } catch (err) {
      setError('An unexpected error occurred while updating status');
      console.error(err);
      return false;
    }
  }, []);

  // Handle delete booking
  const handleDeleteBooking = useCallback(async (bookingId: string) => {
    try {
      const result = await deleteBookingRequest(bookingId);
      
      if (result.success) {
        // Update local state
        setBookingRequests(prev => prev.filter(booking => booking.id !== bookingId));
        return true;
      } else {
        setError(result.error || 'Failed to delete booking');
        return false;
      }
    } catch (err) {
      setError('An unexpected error occurred while deleting booking');
      console.error(err);
      return false;
    }
  }, []);

  // Load bookings on mount
  useEffect(() => {
    loadBookingRequests();
  }, [loadBookingRequests]);

  return {
    bookingRequests: filteredBookingRequests(),
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    refreshBookingRequests: loadBookingRequests,
    handleStatusChange,
    handleDeleteBooking
  };
};

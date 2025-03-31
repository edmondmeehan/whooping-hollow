
import { useState, useEffect, useCallback } from 'react';
import { Booking, BookingStatus } from '@/types/booking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch bookings from Supabase
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    
    try {
      // First, fetch confirmed booking requests from the booking_requests table
      const { data: requestsData, error: requestsError } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (requestsError) {
        throw new Error(requestsError.message);
      }
      
      // Transform booking requests into Booking objects
      const transformedBookings: Booking[] = requestsData.map((request, index) => ({
        id: index + 1, // Use a temporary ID - will be replaced by real ID when permanent bookings system is implemented
        name: `${request.first_name} ${request.last_name}`,
        email: request.email,
        phone: request.phone,
        checkIn: request.check_in,
        checkOut: request.check_out,
        adults: request.adults,
        children: request.children || 0,
        status: (request.status as BookingStatus) || 'new',
        message: request.special_requests || '',
        created_at: request.created_at,
        notes: `Booking imported from direct booking request (ID: ${request.id})`,
        isBlockedDate: false,
        metadata: {
          requestId: request.id,
          source: 'booking_request'
        }
      }));
      
      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setIsError(true);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filter bookings based on selected status
  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(booking => {
        if (statusFilter === 'blocked') {
          return booking.isBlockedDate || booking.status === 'blocked';
        }
        return booking.status === statusFilter;
      });

  // Update booking status in Supabase
  const handleStatusChange = async (bookingId: number, newStatus: BookingStatus) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      if (booking.metadata?.requestId) {
        // Update in the booking_requests table
        const { error } = await supabase
          .from('booking_requests')
          .update({ status: newStatus })
          .eq('id', booking.metadata.requestId);
        
        if (error) throw error;
      }

      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  // Add a new booking
  const addBooking = async (newBookingData: Omit<Booking, 'id' | 'created_at'>) => {
    try {
      // If it's a new regular booking (not a blocked date), add to booking_requests
      if (!newBookingData.isBlockedDate) {
        const { error } = await supabase
          .from('booking_requests')
          .insert({
            first_name: newBookingData.name.split(' ')[0] || 'Guest',
            last_name: newBookingData.name.split(' ').slice(1).join(' ') || 'User',
            email: newBookingData.email,
            phone: newBookingData.phone,
            check_in: newBookingData.checkIn,
            check_out: newBookingData.checkOut,
            adults: newBookingData.adults,
            children: newBookingData.children || 0,
            special_requests: newBookingData.message,
            status: newBookingData.status,
            property: 'whooping_hollow' // Default property
          });
        
        if (error) throw error;
      }

      // For now, also update local state for immediate UI update
      // In a real implementation, you might just re-fetch from the server
      const newBooking: Booking = {
        ...newBookingData,
        id: Math.max(0, ...bookings.map(b => b.id)) + 1,
        created_at: new Date().toISOString()
      };
      
      setBookings(prev => [...prev, newBooking]);
      toast.success('Booking added successfully');
      
      // Refresh data from server to get the proper ID
      fetchBookings();
    } catch (error) {
      console.error('Error adding booking:', error);
      toast.error('Failed to add booking');
    }
  };

  // Delete a booking
  const deleteBooking = async (bookingId: number) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      if (booking.metadata?.requestId) {
        // Delete from booking_requests table
        const { error } = await supabase
          .from('booking_requests')
          .delete()
          .eq('id', booking.metadata.requestId);
        
        if (error) throw error;
      }

      // Update local state
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      toast.success('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  return {
    bookings: filteredBookings,
    isLoading,
    isError,
    statusFilter,
    handleStatusChange,
    updateStatusFilter: setStatusFilter,
    addBooking,
    deleteBooking,
    refreshBookings: fetchBookings
  };
}

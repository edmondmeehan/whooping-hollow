
import { useState } from 'react';
import { BookingRequest } from '@/hooks/use-booking-requests';
import { toast } from 'sonner';

interface BookingRequestOperationsProps {
  refreshBookingRequests: () => Promise<void>;
  handleStatusChange: (bookingId: string, newStatus: string) => Promise<boolean>;
  handleDeleteBooking: (bookingId: string) => Promise<boolean>;
}

export const useBookingRequestOperations = ({
  refreshBookingRequests,
  handleStatusChange,
  handleDeleteBooking
}: BookingRequestOperationsProps) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBookingRequests();
    setIsRefreshing(false);
    toast.success('Booking requests refreshed');
  };

  const openBookingDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    const success = await handleStatusChange(bookingId, newStatus);
    
    if (success) {
      toast.success('Booking status updated');
      // Update the selected booking if it's the one being viewed
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      toast.error('Failed to update booking status');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking request?')) {
      const success = await handleDeleteBooking(bookingId);
      
      if (success) {
        toast.success('Booking request deleted');
        if (selectedBooking && selectedBooking.id === bookingId) {
          closeBookingDetails();
        }
      } else {
        toast.error('Failed to delete booking request');
      }
    }
  };

  return {
    selectedBooking,
    isRefreshing,
    handleRefresh,
    openBookingDetails,
    closeBookingDetails,
    updateBookingStatus,
    deleteBooking
  };
};


import React, { useState } from 'react';
import { useBookingRequests, BookingRequest } from '@/hooks/use-booking-requests';
import { toast } from 'sonner';
import BookingRequestsHeader from './BookingRequestsHeader';
import BookingRequestsTable from './BookingRequestsTable';
import BookingDetailsDialog from './BookingDetailsDialog';

const AdminBookingRequestsRefactored = () => {
  const {
    bookingRequests,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    refreshBookingRequests,
    handleStatusChange,
    handleDeleteBooking
  } = useBookingRequests();

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

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button onClick={refreshBookingRequests} className="btn">Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <BookingRequestsHeader
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      <BookingRequestsTable
        bookingRequests={bookingRequests}
        isLoading={isLoading}
        onViewDetails={openBookingDetails}
        onDelete={deleteBooking}
      />
      
      <BookingDetailsDialog
        booking={selectedBooking}
        onClose={closeBookingDetails}
        onStatusChange={updateBookingStatus}
        onDelete={deleteBooking}
      />
    </div>
  );
};

export default AdminBookingRequestsRefactored;

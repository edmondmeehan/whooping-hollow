
import React from 'react';
import { useBookingRequests } from '@/hooks/use-booking-requests';
import { useBookingRequestOperations } from '@/hooks/booking-requests/use-booking-request-operations';
import BookingRequestsHeader from './BookingRequestsHeader';
import BookingRequestsTable from './BookingRequestsTable';
import BookingDetailsDialog from './BookingDetailsDialog';
import BookingRequestsError from './BookingRequestsError';

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

  const {
    selectedBooking,
    isRefreshing,
    handleRefresh,
    openBookingDetails,
    closeBookingDetails,
    updateBookingStatus,
    deleteBooking
  } = useBookingRequestOperations({
    refreshBookingRequests,
    handleStatusChange,
    handleDeleteBooking
  });

  if (error) {
    return (
      <BookingRequestsError 
        error={error} 
        onRetry={refreshBookingRequests} 
      />
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

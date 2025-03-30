
import React, { useState } from 'react';
import BookingTable from './bookings/BookingTable';
import { useBookings } from '@/hooks/use-bookings';
import BookingDetailsModal from './bookings/BookingDetailsModal';
import { Booking } from '@/types/booking';

const AdminBookings = () => {
  const { bookings, handleStatusChange } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };
  
  const handleCloseModal = () => {
    setSelectedBooking(null);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>
      
      <BookingTable 
        bookings={bookings} 
        onStatusChange={handleStatusChange}
        onBookingClick={handleBookingClick}
      />
      
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          isOpen={!!selectedBooking} 
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminBookings;

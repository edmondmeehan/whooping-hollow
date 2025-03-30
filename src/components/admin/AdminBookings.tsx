
import React from 'react';
import BookingTable from './bookings/BookingTable';
import { useBookings } from '@/hooks/use-bookings';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const AdminBookings = () => {
  const { bookings, handleStatusChange } = useBookings();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>
      
      <BookingTable 
        bookings={bookings} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};

export default AdminBookings;

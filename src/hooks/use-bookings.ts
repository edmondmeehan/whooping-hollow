
import { useState } from 'react';
import { Booking, BookingStatus } from '@/types/booking';
import { useToast } from '@/hooks/use-toast';

// Sample booking data
const initialBookings: Booking[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dates: 'June 15-20, 2023',
    guests: 4,
    status: 'new',
    message: 'Looking forward to our stay!'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    dates: 'July 3-10, 2023',
    guests: 2,
    status: 'confirmed',
    message: 'This is a return visit. We loved our stay last year!'
  },
  {
    id: 3,
    name: 'Michael Wong',
    email: 'mwong@example.com',
    phone: '(555) 555-5555',
    dates: 'August 22-25, 2023',
    guests: 6,
    status: 'cancelled',
    message: 'Need a place for our family reunion.'
  }
];

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { toast } = useToast();

  // Handle status change
  const handleStatusChange = (bookingId: number, newStatus: BookingStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: newStatus} : booking
    );
    
    setBookings(updatedBookings);
    
    toast({
      title: 'Status Updated',
      description: `Booking #${bookingId} status changed to ${newStatus}`,
    });
  };

  return {
    bookings,
    handleStatusChange
  };
};

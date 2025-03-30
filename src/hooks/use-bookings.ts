
import { useState, useCallback } from 'react';
import { Booking, BookingStatus } from '@/types/booking';
import { useToast } from '@/hooks/use-toast';

// Sample booking data
const initialBookings: Booking[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    checkIn: '2023-06-15',
    checkOut: '2023-06-20',
    adults: 2,
    children: 2,
    status: 'new',
    message: 'Looking forward to our stay!',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    checkIn: '2023-07-03',
    checkOut: '2023-07-10',
    adults: 2,
    status: 'confirmed',
    message: 'This is a return visit. We loved our stay last year!',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
  },
  {
    id: 3,
    name: 'Michael Wong',
    email: 'mwong@example.com',
    phone: '(555) 555-5555',
    checkIn: '2023-08-22',
    checkOut: '2023-08-25',
    adults: 4,
    children: 2,
    status: 'cancelled',
    message: 'Need a place for our family reunion. We would like to know if you have any special accommodations for large groups. Also, is the property child-friendly?',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() // 10 days ago
  },
  {
    id: 4,
    name: 'Blocked for Maintenance',
    email: 'admin@property.com',
    phone: 'N/A',
    checkIn: '2023-09-01',
    checkOut: '2023-09-05',
    adults: 0,
    status: 'blocked',
    notes: 'Annual maintenance and deep cleaning',
    isBlockedDate: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() // 1 day ago
  }
];

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const { toast } = useToast();

  // Handle status change
  const handleStatusChange = (bookingId: number, newStatus: BookingStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: newStatus} : booking
    );
    
    setBookings(updatedBookings);
    applyFilters(updatedBookings, statusFilter);
    
    toast({
      title: 'Status Updated',
      description: `Booking #${bookingId} status changed to ${newStatus}`,
    });
  };

  // Filter bookings by status
  const applyFilters = useCallback((bookingsToFilter: Booking[], status: BookingStatus | 'all') => {
    if (status === 'all') {
      setFilteredBookings(bookingsToFilter);
    } else {
      setFilteredBookings(bookingsToFilter.filter(booking => booking.status === status));
    }
  }, []);

  // Add a new booking
  const addBooking = useCallback((newBooking: Omit<Booking, 'id' | 'created_at'>) => {
    const bookingToAdd: Booking = {
      ...newBooking,
      id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      created_at: new Date().toISOString()
    };
    
    const updatedBookings = [...bookings, bookingToAdd];
    setBookings(updatedBookings);
    applyFilters(updatedBookings, statusFilter);
    
    toast({
      title: 'Booking Added',
      description: `New booking for ${newBooking.name} has been added`,
    });
    
    return bookingToAdd;
  }, [bookings, applyFilters, statusFilter, toast]);

  // Delete a booking
  const deleteBooking = useCallback((bookingId: number) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    applyFilters(updatedBookings, statusFilter);
    
    toast({
      title: 'Booking Deleted',
      description: `Booking #${bookingId} has been deleted`,
    });
  }, [bookings, applyFilters, statusFilter, toast]);

  // Update status filter
  const updateStatusFilter = useCallback((status: BookingStatus | 'all') => {
    setStatusFilter(status);
    applyFilters(bookings, status);
  }, [bookings, applyFilters]);

  return {
    bookings: filteredBookings,
    allBookings: bookings,
    statusFilter,
    handleStatusChange,
    updateStatusFilter,
    addBooking,
    deleteBooking
  };
};

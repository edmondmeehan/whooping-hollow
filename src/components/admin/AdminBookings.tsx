
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CheckIcon, XIcon, TrashIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample booking data
const initialBookings = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    dates: 'May 10 - May 15, 2024',
    guests: 4,
    status: 'pending',
    message: 'Looking forward to our stay!'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 987-6543',
    dates: 'June 20 - June 27, 2024',
    guests: 6,
    status: 'confirmed',
    message: 'We need extra towels and early check-in if possible.'
  },
  {
    id: 3,
    name: 'Robert Davis',
    email: 'robert@example.com',
    phone: '(555) 456-7890',
    dates: 'July 1 - July 8, 2024',
    guests: 2,
    status: 'cancelled',
    message: 'Planning our anniversary trip.'
  }
];

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: number;
  status: BookingStatus;
  message: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: BookingStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    
    toast({
      title: 'Status Updated',
      description: `Booking #${id} has been marked as ${newStatus}`,
    });
  };

  const handleDeleteBooking = (id: number) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    
    toast({
      title: 'Booking Deleted',
      description: `Booking #${id} has been deleted`,
    });
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mb-2" />
                    <p>No bookings available</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">{booking.message}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{booking.email}</p>
                      <p>{booking.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.dates}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {booking.status !== 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        >
                          <XIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBookings;

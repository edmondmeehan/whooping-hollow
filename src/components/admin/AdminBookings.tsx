
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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

// Status color mapping
const statusColors: Record<BookingStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const AdminBookings = () => {
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
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>
                  <div>{booking.email}</div>
                  <div className="text-sm text-gray-500">{booking.phone}</div>
                </TableCell>
                <TableCell>{booking.dates}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>
                  <Badge className={statusColors[booking.status]}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select 
                    defaultValue={booking.status}
                    onValueChange={(value) => handleStatusChange(booking.id, value as BookingStatus)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {bookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No booking requests yet.
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

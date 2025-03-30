
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Booking, BookingStatus } from '@/types/booking';
import StatusBadge from './StatusBadge';
import StatusSelect from './StatusSelect';

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onStatusChange }) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No booking requests yet.
      </div>
    );
  }

  return (
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
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell>
                <StatusSelect 
                  currentStatus={booking.status} 
                  bookingId={booking.id} 
                  onStatusChange={onStatusChange} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;


import React, { useState } from 'react';
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
import BookingDetailsModal from './BookingDetailsModal';

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onStatusChange }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleRowClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };
  
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No booking requests yet.
      </div>
    );
  }

  return (
    <>
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
              <TableRow 
                key={booking.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(booking)}
              >
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
                <TableCell onClick={(e) => e.stopPropagation()}>
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

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

export default BookingTable;

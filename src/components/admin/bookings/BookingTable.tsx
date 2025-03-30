
import React from 'react';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import StatusSelect from './StatusSelect';
import { Booking, BookingStatus } from '@/types/booking';
import { format } from 'date-fns';

export interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
  onBookingClick: (booking: Booking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  onStatusChange,
  onBookingClick
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No booking requests found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow 
                key={booking.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onBookingClick(booking)}
              >
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>
                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                </TableCell>
                <TableCell>{booking.adults + (booking.children || 0)}</TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell>
                  <StatusSelect
                    currentStatus={booking.status}
                    bookingId={booking.id}
                    onStatusChange={(bookingId, newStatus) => {
                      onStatusChange(bookingId, newStatus);
                      // Stop propagation to prevent opening the modal
                      event?.stopPropagation();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;

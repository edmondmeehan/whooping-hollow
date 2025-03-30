
import React from 'react';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import StatusSelect from './StatusSelect';
import { Booking, BookingStatus } from '@/types/booking';
import { format, differenceInDays } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
  onBookingClick: (booking: Booking) => void;
  onDeleteBooking: (bookingId: number) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  onStatusChange,
  onBookingClick,
  onDeleteBooking
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
      return nights > 0 ? nights : 0;
    } catch (error) {
      return 0;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => {
              const isBlockedDate = booking.status === 'blocked' || booking.isBlockedDate;
              const nights = calculateNights(booking.checkIn, booking.checkOut);
              
              return (
                <TableRow 
                  key={booking.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onBookingClick(booking)}
                >
                  <TableCell className="font-medium">
                    {isBlockedDate ? (
                      <span className="text-muted-foreground italic">{booking.name}</span>
                    ) : (
                      booking.name
                    )}
                  </TableCell>
                  <TableCell>{formatDate(booking.checkIn)}</TableCell>
                  <TableCell>{formatDate(booking.checkOut)}</TableCell>
                  <TableCell>{nights} {nights === 1 ? 'night' : 'nights'}</TableCell>
                  <TableCell>
                    {isBlockedDate ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      `${booking.adults + (booking.children || 0)}`
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <StatusSelect
                        currentStatus={booking.status}
                        bookingId={booking.id}
                        onStatusChange={onStatusChange}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteBooking(booking.id);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;

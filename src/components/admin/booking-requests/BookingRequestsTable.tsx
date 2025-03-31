
import React from 'react';
import { BookingRequest } from '@/hooks/use-booking-requests';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format, differenceInDays } from 'date-fns';
import { Loader2, Eye, Trash2 } from 'lucide-react';
import StatusBadge from '../bookings/StatusBadge';

interface BookingRequestsTableProps {
  bookingRequests: BookingRequest[];
  isLoading: boolean;
  onViewDetails: (booking: BookingRequest) => void;
  onDelete: (bookingId: string) => void;
}

const BookingRequestsTable: React.FC<BookingRequestsTableProps> = ({
  bookingRequests,
  isLoading,
  onViewDetails,
  onDelete,
}) => {
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      return differenceInDays(new Date(checkOut), new Date(checkIn));
    } catch (e) {
      return 0;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading booking requests...</p>
              </TableCell>
            </TableRow>
          ) : bookingRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <p className="text-muted-foreground">No booking requests found</p>
              </TableCell>
            </TableRow>
          ) : (
            bookingRequests.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {booking.first_name} {booking.last_name}
                </TableCell>
                <TableCell>{booking.property.replace('_', ' ')}</TableCell>
                <TableCell>
                  {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                  <div className="text-xs text-muted-foreground">
                    {calculateNights(booking.check_in, booking.check_out)} nights
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={booking.status as any} />
                </TableCell>
                <TableCell>
                  {formatDate(booking.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onViewDetails(booking)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDelete(booking.id)}
                      title="Delete request"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingRequestsTable;

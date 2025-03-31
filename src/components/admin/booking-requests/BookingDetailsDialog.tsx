
import React from 'react';
import { BookingRequest } from '@/hooks/use-booking-requests';
import { format, differenceInDays } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '../bookings/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookingDetailsDialogProps {
  booking: BookingRequest | null;
  onClose: () => void;
  onStatusChange: (bookingId: string, newStatus: string) => Promise<void>;
  onDelete: (bookingId: string) => Promise<void>;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  booking,
  onClose,
  onStatusChange,
  onDelete,
}) => {
  if (!booking) return null;

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
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Request Details</DialogTitle>
          <DialogDescription>
            Request submitted on {formatDate(booking.created_at)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Guest Information</h3>
            <p>
              {booking.first_name} {booking.last_name}
            </p>
            <p className="text-sm">
              <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                {booking.email}
              </a>
            </p>
            <p className="text-sm">
              <a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">
                {booking.phone}
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Booking Details</h3>
            <p>Property: {booking.property.replace('_', ' ')}</p>
            <p>
              Dates: {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
              <span className="text-sm text-muted-foreground ml-2">
                ({calculateNights(booking.check_in, booking.check_out)} nights)
              </span>
            </p>
            <p>Guests: {booking.adults + booking.children} total
              {booking.children > 0 && 
                <span className="text-sm text-muted-foreground ml-2">
                  ({booking.adults} adults, {booking.children} children)
                </span>
              }
            </p>
          </div>
          
          {booking.special_requests && (
            <div>
              <h3 className="font-medium mb-1">Special Requests</h3>
              <p className="text-sm whitespace-pre-line">{booking.special_requests}</p>
            </div>
          )}
          
          <div>
            <h3 className="font-medium mb-1">Status</h3>
            <div className="flex items-center gap-3">
              <StatusBadge status={booking.status as any} />
              <Select
                value={booking.status}
                onValueChange={(value) => onStatusChange(booking.id, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="destructive"
            onClick={() => onDelete(booking.id)}
            className="mr-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Request
          </Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;

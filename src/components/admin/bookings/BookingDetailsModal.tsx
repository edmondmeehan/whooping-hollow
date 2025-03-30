
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Booking, BookingStatus } from '@/types/booking';
import StatusBadge from './StatusBadge';
import StatusSelect from './StatusSelect';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { MessageCircle, User, Calendar, Users, Phone, Mail, Trash2, CalendarRange, Pencil, Clock } from 'lucide-react';

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
  onDeleteBooking: (bookingId: number) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onStatusChange,
  onDeleteBooking
}) => {
  if (!booking) return null;

  // Check if this is a blocked date
  const isBlockedDate = booking.status === 'blocked' || booking.isBlockedDate;

  // Format dates properly
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Calculate number of nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      return differenceInDays(new Date(checkOut), new Date(checkIn));
    } catch (error) {
      return 0;
    }
  };

  // Calculate total guests
  const totalGuests = booking.adults + (booking.children || 0);
  const nights = calculateNights(booking.checkIn, booking.checkOut);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this booking?')) {
      onDeleteBooking(booking.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{isBlockedDate ? 'Blocked Dates' : `Booking #${booking.id}`}</span>
              <StatusBadge status={booking.status} />
            </div>
          </DialogTitle>
          <DialogDescription>
            {booking.created_at && (
              <span>
                Added {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <CalendarRange className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Stay Details</h3>
              <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
              <p className="text-sm text-muted-foreground">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </p>
            </div>
          </div>

          {!isBlockedDate && (
            <>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Guest</h3>
                  <p>{booking.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Guests</h3>
                  <p>{totalGuests} {totalGuests === 1 ? 'person' : 'people'}</p>
                  {booking.children && booking.children > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {booking.adults} adult{booking.adults !== 1 ? 's' : ''}, {booking.children} child{booking.children !== 1 ? 'ren' : ''}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{booking.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{booking.phone}</p>
                </div>
              </div>

              {booking.message && (
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Message</h3>
                    <p className="text-sm whitespace-pre-line">{booking.message}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {booking.notes && (
            <div className="flex items-start gap-3">
              <Pencil className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm whitespace-pre-line">{booking.notes}</p>
              </div>
            </div>
          )}

          {isBlockedDate && (
            <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
              <h3 className="font-medium flex items-center gap-2 text-amber-800">
                <Clock className="h-4 w-4" />
                <span>Maintenance/Blocked Period</span>
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                These dates are blocked from booking.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <div className="w-full flex flex-col sm:flex-row justify-between gap-3 items-center">
            <div className="w-full sm:w-auto">
              <StatusSelect 
                currentStatus={booking.status} 
                bookingId={booking.id} 
                onStatusChange={onStatusChange}
                variant="default"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="destructive" onClick={handleDelete} className="flex-1 sm:flex-initial">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-initial">
                Close
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;


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
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, User, Calendar, Users, Phone, Mail } from 'lucide-react';

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onStatusChange
}) => {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Booking #{booking.id}</span>
            <StatusBadge status={booking.status} />
          </DialogTitle>
          <DialogDescription>
            Received {booking.created_at ? formatDistanceToNow(new Date(booking.created_at), { addSuffix: true }) : 'recently'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Guest</h3>
              <p>{booking.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Dates</h3>
              <p>{booking.dates}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Guests</h3>
              <p>{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</p>
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
        </div>
        
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <div className="flex-1">
              <StatusSelect 
                currentStatus={booking.status} 
                bookingId={booking.id} 
                onStatusChange={onStatusChange}
                variant="default"
              />
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;


import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Booking } from '@/types/booking';

// Import our refactored components
import DateSelectionFields from './form/DateSelectionFields';
import GuestInfoFields from './form/GuestInfoFields';
import BlockingNotesField from './form/BlockingNotesField';
import { createBookingSchema, BookingFormValues } from './form/bookingFormSchema';

interface BookingCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBooking: (booking: Omit<Booking, 'id' | 'created_at'>) => void;
  mode: 'booking' | 'block';
}

const BookingCreateModal: React.FC<BookingCreateModalProps> = ({
  isOpen,
  onClose,
  onCreateBooking,
  mode
}) => {
  const isBlocking = mode === 'block';
  
  const bookingSchema = createBookingSchema(isBlocking);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: isBlocking ? 'Blocked for Maintenance' : '',
      email: isBlocking ? 'admin@property.com' : '',
      phone: isBlocking ? 'N/A' : '',
      adults: isBlocking ? 0 : 1,
      children: 0,
      status: isBlocking ? 'blocked' : 'new',
      notes: isBlocking ? 'Period blocked for maintenance or unavailability' : '',
    }
  });

  function onSubmit(data: BookingFormValues) {
    const submissionData: Omit<Booking, 'id' | 'created_at'> = {
      name: data.name,
      email: data.email || 'admin@property.com',
      phone: data.phone || 'N/A',
      checkIn: format(data.checkIn, 'yyyy-MM-dd'),
      checkOut: format(data.checkOut, 'yyyy-MM-dd'),
      adults: data.adults,
      children: data.children,
      status: isBlocking ? 'blocked' : data.status,
      message: data.message,
      notes: data.notes,
      isBlockedDate: isBlocking
    };
    
    onCreateBooking(submissionData);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isBlocking ? 'Block Dates' : 'Add New Booking'}</DialogTitle>
          <DialogDescription>
            {isBlocking 
              ? 'Block dates to prevent bookings during maintenance or unavailability.' 
              : 'Add a new booking to the system.'}
          </DialogDescription>
        </DialogHeader>
        
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Date Selection */}
              <DateSelectionFields />
              
              {/* Guest Info */}
              <GuestInfoFields isBlocking={isBlocking} />
              
              {/* Notes for blocked dates */}
              {isBlocking && <BlockingNotesField />}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose} className="mr-2">
                  Cancel
                </Button>
                <Button type="submit">
                  {isBlocking ? 'Block Dates' : 'Add Booking'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCreateModal;

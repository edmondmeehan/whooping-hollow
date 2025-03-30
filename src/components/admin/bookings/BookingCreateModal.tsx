import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Booking, BookingStatus } from '@/types/booking';
import { format } from 'date-fns';
import { CalendarRange, User, Mail, Phone, Users, MessageCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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
  
  const bookingSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    email: isBlocking ? z.string().optional() : z.string().email({ message: 'Valid email is required' }),
    phone: isBlocking ? z.string().optional() : z.string().min(5, { message: 'Phone number is required' }),
    checkIn: z.date({ required_error: 'Check-in date is required' }),
    checkOut: z.date({ required_error: 'Check-out date is required' })
      .refine(date => date > new Date(), { message: 'Check-out date must be in the future' }),
    adults: isBlocking ? z.number().default(0) : z.number().min(1, { message: 'At least 1 adult is required' }),
    children: z.number().min(0).optional(),
    message: z.string().optional(),
    notes: z.string().optional(),
    status: z.enum(['new', 'confirmed', 'cancelled', 'blocked']),
  })
  .refine(data => data.checkOut > data.checkIn, {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  });

  type BookingFormValues = z.infer<typeof bookingSchema>;

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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-1">
                      <CalendarRange className="h-4 w-4" />
                      Check-in
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMM dd, yyyy")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-out</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMM dd, yyyy")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => {
                            const checkIn = form.getValues().checkIn;
                            return checkIn ? date < checkIn : false;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Guest Info */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {isBlocking ? 'Block Description' : 'Guest Name'}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={isBlocking ? 'e.g. Maintenance, Personal Use' : 'Guest Name'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {!isBlocking && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Adults
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            value={field.value} 
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                            min={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            value={field.value || 0} 
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        Special Requests
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any special requests or comments?" 
                          className="resize-none min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {isBlocking && (
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Add any notes about this blocked period" 
                        className="resize-none min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
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
      </DialogContent>
    </Dialog>
  );
};

export default BookingCreateModal;

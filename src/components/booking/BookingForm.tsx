import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookingFormValues, BookingFormData, bookingFormSchema } from '@/types/bookingForm';
import { addDays } from 'date-fns';
import { useBookings } from '@/hooks/use-bookings';
import { BookingStatus } from '@/types/booking';
import { submitBookingToSupabase } from '@/utils/bookingUtils';
import { supabase } from '@/integrations/supabase/client';

// Import form field components
import PersonalInfoFields from './PersonalInfoFields';
import ContactFields from './ContactFields';
import LocationField from './LocationField';
import DatesField from './DatesField';
import GuestsField from './GuestsField';
import SpecialRequestsField from './SpecialRequestsField';

const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addBooking } = useBookings();
  
  // Set default dates (today for check-in, tomorrow for check-out)
  const today = new Date();
  const tomorrow = addDays(today, 1);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      property: 'whooping_hollow',
      checkIn: today,
      checkOut: tomorrow,
      adults: 2,
      children: 0,
      specialRequests: ''
    }
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', data);
      
      // Submit to Supabase
      const supabaseResult = await submitBookingToSupabase(data);
      
      if (!supabaseResult.success) {
        throw new Error(supabaseResult.error || 'Failed to submit booking to database');
      }
      
      // Add booking to the admin dashboard (keeping for backward compatibility)
      const booking = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        checkIn: data.checkIn.toISOString().split('T')[0],
        checkOut: data.checkOut.toISOString().split('T')[0],
        adults: data.adults,
        children: data.children || 0,
        status: 'new' as BookingStatus,
        message: data.specialRequests,
        notes: `Booking made through direct booking form for ${data.property}`,
        isBlockedDate: false
      };
      
      // Add to the booking system (for local state management)
      addBooking(booking);
      
      // Send emails via Supabase edge function
      try {
        console.log('Attempting to send confirmation emails...');
        
        // Prepare email data
        const emailData = {
          guestName: `${data.firstName} ${data.lastName}`,
          guestEmail: data.email,
          adminEmail: 'eddie@please.co',
          property: data.property,
          checkIn: data.checkIn.toISOString().split('T')[0],
          checkOut: data.checkOut.toISOString().split('T')[0],
          guests: data.adults + (data.children || 0),
          phone: data.phone,
          specialRequests: data.specialRequests || ''
        };
        
        // Call the send-email edge function
        const { error: emailError } = await supabase.functions.invoke('send-email', {
          body: {
            type: 'booking-confirmation',
            data: emailData
          }
        });
        
        if (emailError) {
          console.error('Error sending emails:', emailError);
          // Still show success but with modified message
          toast.success('Booking request submitted successfully!', {
            description: 'Your request was received, but there was an issue sending confirmation emails. We\'ll contact you soon.'
          });
        } else {
          toast.success('Booking request submitted successfully!', {
            description: 'We\'ve sent you a confirmation email. We will contact you shortly with your special discount.'
          });
        }
      } catch (emailError) {
        console.error('Error with email function:', emailError);
        // Still show success since the booking was saved to database
        toast.success('Booking request submitted successfully!', {
          description: 'Your booking was received, but there was an issue sending confirmation emails. We\'ll contact you soon.'
        });
      }
      
      // Reset form after successful submission
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        property: 'whooping_hollow',
        checkIn: new Date(),
        checkOut: addDays(new Date(), 1),
        adults: 2,
        children: 0,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error processing booking:', error);
      toast.error('There was a problem processing your booking request', {
        description: error instanceof Error ? error.message : 'Please try again later or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoFields form={form} />
          <ContactFields form={form} />
          <LocationField form={form} />
          <DatesField form={form} />
          <GuestsField form={form} />
          <SpecialRequestsField form={form} />
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default BookingForm;

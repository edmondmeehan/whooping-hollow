
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookingFormValues, BookingFormData, bookingFormSchema } from '@/types/bookingForm';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';
import { addDays } from 'date-fns';
import { useBookings } from '@/hooks/use-bookings';
import { BookingStatus } from '@/types/booking';
import { submitBookingToSupabase } from '@/utils/bookingUtils';

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
      
      // Convert BookingFormValues to BookingFormData format for email utils
      const emailData: BookingFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        location: data.property,
        dates: { 
          from: data.checkIn,
          to: data.checkOut
        },
        guests: String(data.adults + (data.children || 0)),
        specialRequests: data.specialRequests
      };
      
      // Try to send emails but don't block the success flow if they fail
      try {
        console.log('Attempting to send confirmation emails...');
        
        // Send confirmation email to guest (which now includes Eddie as BCC)
        const guestEmailSent = await sendBookingConfirmation(emailData);
        console.log('Guest email sent result:', guestEmailSent);
        
        // Send notification to admin (attempt even if guest email fails)
        const adminEmailSent = await sendAdminNotification(emailData);
        console.log('Admin email sent result:', adminEmailSent);
        
        if (!guestEmailSent && !adminEmailSent) {
          console.warn('Both guest and admin emails failed to send');
          // Still showing success but with modified message
          toast.success('Booking request submitted successfully!', {
            description: 'Your request was received, but there was an issue sending confirmation emails. We\'ll contact you soon.'
          });
        } else {
          toast.success('Booking request submitted successfully!', {
            description: guestEmailSent 
              ? 'We\'ve sent you a confirmation email. We will contact you shortly with your special discount.'
              : 'Your request was received, but there was an issue sending the confirmation email. We\'ll contact you soon.'
          });
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
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

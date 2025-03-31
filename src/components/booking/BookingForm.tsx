
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookingFormValues, BookingFormData, bookingFormSchema } from '@/types/bookingForm';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/emailUtils';
import { addDays } from 'date-fns';

// Import form field components
import PersonalInfoFields from './PersonalInfoFields';
import ContactFields from './ContactFields';
import LocationField from './LocationField';
import DatesField from './DatesField';
import GuestsField from './GuestsField';
import SpecialRequestsField from './SpecialRequestsField';

const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      
      // Send confirmation email to guest
      const guestEmailSent = await sendBookingConfirmation(emailData);
      
      // Send notification to admin (attempt even if guest email fails)
      const adminEmailSent = await sendAdminNotification(emailData);
      
      if (guestEmailSent || adminEmailSent) {
        toast.success(guestEmailSent ? 'Booking request submitted successfully!' : 'Booking request received', {
          description: guestEmailSent 
            ? 'We\'ve sent you a confirmation email. We will contact you shortly with your special discount.'
            : 'Your request was received, but there was an issue sending the confirmation email. We\'ll contact you soon.'
        });
        
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
      } else {
        // Both emails failed
        toast.error('There was a problem processing your booking request', {
          description: 'Please check your email address or try again later.'
        });
      }
    } catch (error) {
      console.error('Error processing booking:', error);
      toast.error('There was a problem processing your booking request', {
        description: 'Please try again later or contact us directly.'
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

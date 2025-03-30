
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookingFormValues } from '@/types/bookingForm';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/emailUtils';

// Import form field components
import PersonalInfoFields from './PersonalInfoFields';
import ContactFields from './ContactFields';
import LocationField from './LocationField';
import DatesField from './DatesField';
import GuestsField from './GuestsField';
import SpecialRequestsField from './SpecialRequestsField';

const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<BookingFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: 'montauk',
      guests: '2',
      specialRequests: ''
    }
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', data);
      
      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(data.email)) {
        toast.error('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }
      
      // Send confirmation email to guest
      const emailSent = await sendBookingConfirmation(data);
      
      if (emailSent) {
        // Send notification to admin
        await sendAdminNotification(data);
        
        toast.success('Booking request submitted successfully!', {
          description: 'We\'ve sent you a confirmation email. We will contact you shortly with your special discount.'
        });
        
        form.reset();
      } else {
        // Email failed but we'll still process the booking
        toast.success('Booking request submitted', {
          description: 'Your request was received, but there was an issue sending the confirmation email. We\'ll contact you soon.'
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

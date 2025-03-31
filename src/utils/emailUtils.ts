import { toast } from 'sonner';
import { BookingFormData } from '@/types/bookingForm';

interface BookingFormDataWithDates extends BookingFormData {
  dates: { 
    from: Date; 
    to?: Date 
  };
}

const getResendApiKey = (): string | null => {
  const savedKeys = localStorage.getItem('whh_api_keys');
  if (!savedKeys) return null;
  
  try {
    const keys = JSON.parse(savedKeys);
    const resendKey = keys.find((key: any) => 
      key.name === 'Resend API' || 
      key.name.toLowerCase().includes('resend')
    );
    return resendKey?.key || null;
  } catch (error) {
    console.error('Error parsing API keys:', error);
    return null;
  }
};

const formatDate = (date: Date): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatPropertyName = (propertyCode: string): string => {
  switch(propertyCode) {
    case 'whooping_hollow':
      return 'Whooping Hollow Haven (Montauk, NY)';
    case 'nashville_downtown':
      return 'Nashville Downtown Property';
    case 'nashville_music_row':
      return 'Nashville Music Row Property';
    default:
      return propertyCode;
  }
};

export const sendBookingConfirmation = async (formData: BookingFormDataWithDates): Promise<boolean> => {
  const apiKey = getResendApiKey();
  
  if (!apiKey) {
    toast.error("API Key Missing", {
      description: "Please add your Resend API key in the Admin panel"
    });
    return false;
  }

  const checkIn = formatDate(formData.dates.from);
  const checkOut = formData.dates.to ? formatDate(formData.dates.to) : '';
  const propertyName = formatPropertyName(formData.location);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Whooping Hollow Haven <bookings@whoopinghollowhaven.com>',
        to: formData.email,
        subject: 'Your Booking Request at Whooping Hollow Haven',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; margin-bottom: 20px;">Booking Request Confirmation</h1>
            <p>Dear ${formData.firstName} ${formData.lastName},</p>
            <p>Thank you for your booking request at Whooping Hollow Haven! We've received your inquiry and will get back to you within 24 hours with a special direct booking discount.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Your Request Details:</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</li>
                <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${checkIn}</li>
                ${checkOut ? `<li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${checkOut}</li>` : ''}
                <li style="margin-bottom: 10px;"><strong>Guests:</strong> ${formData.guests}</li>
                ${formData.specialRequests ? `<li style="margin-bottom: 10px;"><strong>Special Requests:</strong> ${formData.specialRequests}</li>` : ''}
              </ul>
            </div>
            
            <p>By booking directly with us, you'll receive personalized service and the best possible rate.</p>
            <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
            
            <p style="margin-top: 30px;">Best regards,<br>Whooping Hollow Haven Team</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    toast.error("Email Sending Failed", {
      description: error instanceof Error ? error.message : "Failed to send confirmation email"
    });
    return false;
  }
};

export const sendAdminNotification = async (formData: BookingFormDataWithDates): Promise<boolean> => {
  const apiKey = getResendApiKey();
  
  if (!apiKey) {
    toast.error("API Key Missing", {
      description: "Please add your Resend API key in the Admin panel"
    });
    return false;
  }

  const checkIn = formatDate(formData.dates.from);
  const checkOut = formData.dates.to ? formatDate(formData.dates.to) : '';
  const propertyName = formatPropertyName(formData.location);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Whooping Hollow Haven <bookings@whoopinghollowhaven.com>',
        to: 'admin@whoopinghollowhaven.com', // Replace with your admin email
        subject: 'New Direct Booking Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; margin-bottom: 20px;">New Direct Booking Request</h1>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Guest Information:</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> ${formData.email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${formData.phone}</li>
                <li style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</li>
                <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${checkIn}</li>
                ${checkOut ? `<li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${checkOut}</li>` : ''}
                <li style="margin-bottom: 10px;"><strong>Guests:</strong> ${formData.guests}</li>
                ${formData.specialRequests ? `<li style="margin-bottom: 10px;"><strong>Special Requests:</strong> ${formData.specialRequests}</li>` : ''}
              </ul>
            </div>
            
            <p>Please login to the admin panel to manage this booking request.</p>
            
            <p style="margin-top: 30px;">Automated Notification<br>Whooping Hollow Haven Booking System</p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send admin notification');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    toast.error("Notification Sending Failed", {
      description: error instanceof Error ? error.message : "Failed to send admin notification"
    });
    return false;
  }
};

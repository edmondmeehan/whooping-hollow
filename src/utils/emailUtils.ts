
import { toast } from '@/hooks/use-toast';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dates: { from: Date; to?: Date };
  guests: string;
  specialRequests?: string;
}

const getResendApiKey = (): string | null => {
  const savedKeys = localStorage.getItem('whh_api_keys');
  if (!savedKeys) return null;
  
  const keys = JSON.parse(savedKeys);
  const resendKey = keys.find((key: any) => key.name === 'Resend API');
  return resendKey?.key || null;
};

export const sendBookingConfirmation = async (formData: BookingFormData): Promise<boolean> => {
  const apiKey = getResendApiKey();
  
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please add your Resend API key in the Admin panel",
      variant: "destructive",
    });
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'bookings@whoopinghollowhaven.com',
        to: formData.email,
        subject: 'Your Booking Request at Whooping Hollow Haven',
        html: `
          <h1>Booking Confirmation</h1>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>Thank you for your booking request at Whooping Hollow Haven!</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li>Location: ${formData.location === 'montauk' ? 'Whooping Hollow Haven (Montauk, NY)' : 'Nashville Properties'}</li>
            <li>Dates: ${formData.dates.from.toLocaleDateString()} ${formData.dates.to ? '- ' + formData.dates.to.toLocaleDateString() : ''}</li>
            <li>Guests: ${formData.guests}</li>
            ${formData.specialRequests ? `<li>Special Requests: ${formData.specialRequests}</li>` : ''}
          </ul>
          <p>We will contact you shortly to confirm your booking and provide you with a special discount.</p>
          <p>Best regards,<br>Whooping Hollow Haven Team</p>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    toast({
      title: "Email Sending Failed",
      description: error instanceof Error ? error.message : "Failed to send confirmation email",
      variant: "destructive",
    });
    return false;
  }
};

export const sendAdminNotification = async (formData: BookingFormData): Promise<void> => {
  const apiKey = getResendApiKey();
  
  if (!apiKey) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'bookings@whoopinghollowhaven.com',
        to: 'admin@whoopinghollowhaven.com', // Replace with your admin email
        subject: 'New Booking Request',
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Guest Information:</strong></p>
          <ul>
            <li>Name: ${formData.firstName} ${formData.lastName}</li>
            <li>Email: ${formData.email}</li>
            <li>Phone: ${formData.phone}</li>
            <li>Location: ${formData.location === 'montauk' ? 'Whooping Hollow Haven (Montauk, NY)' : 'Nashville Properties'}</li>
            <li>Dates: ${formData.dates.from.toLocaleDateString()} ${formData.dates.to ? '- ' + formData.dates.to.toLocaleDateString() : ''}</li>
            <li>Guests: ${formData.guests}</li>
            ${formData.specialRequests ? `<li>Special Requests: ${formData.specialRequests}</li>` : ''}
          </ul>
          <p>Please login to the admin panel to manage this booking.</p>
        `
      })
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};


import { BookingFormData } from '@/types/bookingForm';
import { formatDate, formatPropertyName } from './emailHelpers';
import { sendEmail } from './emailService';

interface BookingFormDataWithDates extends BookingFormData {
  dates: { 
    from: Date; 
    to?: Date 
  };
}

/**
 * Sends a booking confirmation email to the guest
 */
export const sendBookingConfirmation = async (formData: BookingFormDataWithDates): Promise<boolean> => {
  const checkIn = formatDate(formData.dates.from);
  const checkOut = formData.dates.to ? formatDate(formData.dates.to) : '';
  const propertyName = formatPropertyName(formData.location);

  return sendEmail({
    from: 'Whooping Hollow <onboarding@resend.dev>',
    to: formData.email,
    bcc: ['eddie@please.co'], // Add Eddie as BCC to guest confirmation
    subject: 'Your Booking Request at Whooping Hollow',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">Booking Request Confirmation</h1>
        <p>Dear ${formData.firstName} ${formData.lastName},</p>
        <p>Thank you for your booking request at Whooping Hollow! We've received your inquiry and will get back to you within 24 hours with a special direct booking discount.</p>
        
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
        
        <p style="margin-top: 30px;">Best regards,<br>Whooping Hollow Team</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    `
  });
};

/**
 * Sends an admin notification email about a new booking
 */
export const sendAdminNotification = async (formData: BookingFormDataWithDates): Promise<boolean> => {
  const checkIn = formatDate(formData.dates.from);
  const checkOut = formData.dates.to ? formatDate(formData.dates.to) : '';
  const propertyName = formatPropertyName(formData.location);

  return sendEmail({
    from: 'Whooping Hollow <onboarding@resend.dev>',
    to: ['admin@whoopinghollowhaven.com', 'eddie@please.co'], // Send directly to Eddie
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
        
        <p style="margin-top: 30px;">Automated Notification<br>Whooping Hollow Booking System</p>
      </div>
    `
  });
};

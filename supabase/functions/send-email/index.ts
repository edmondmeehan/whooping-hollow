
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Escape HTML special characters to prevent HTML injection
 * @param text - The text to escape
 * @returns The escaped text safe for HTML insertion
 */
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    if (type === "booking-confirmation") {
      // Send confirmation to guest
      const guestEmailResponse = await sendBookingConfirmationToGuest(data);
      
      // Send notification to admin
      const adminEmailResponse = await sendBookingNotificationToAdmin(data);

      return new Response(
        JSON.stringify({ 
          success: true, 
          guestEmail: guestEmailResponse, 
          adminEmail: adminEmailResponse 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } else if (type === "welcome-email") {
      // Handle welcome email (from the admin welcome email form)
      const welcomeEmailResponse = await sendWelcomeEmail(data);
      
      return new Response(
        JSON.stringify({ success: true, email: welcomeEmailResponse }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    throw new Error("Unsupported email type");
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

// Send booking confirmation to guest
async function sendBookingConfirmationToGuest(data: any) {
  const {
    guestName,
    guestEmail,
    property,
    checkIn,
    checkOut,
    guests
  } = data;

  // Sanitize all user inputs
  const safeGuestName = escapeHtml(guestName);
  const safeCheckIn = escapeHtml(checkIn);
  const safeCheckOut = escapeHtml(checkOut);
  const safeGuests = escapeHtml(guests);
  const propertyName = formatPropertyName(property);

  return await resend.emails.send({
    from: "Whooping Hollow Haven <onboarding@resend.dev>",
    to: [guestEmail],
    bcc: ["eddie@please.co"], // Add Eddie as BCC to guest confirmation
    subject: "Your Booking Request at Whooping Hollow Haven",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">Booking Request Confirmation</h1>
        <p>Dear ${safeGuestName},</p>
        <p>Thank you for your booking request at Whooping Hollow Haven! We've received your inquiry and will get back to you within 24 hours with a special direct booking discount.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Your Request Details:</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</li>
            <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${safeCheckIn}</li>
            <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${safeCheckOut}</li>
            <li style="margin-bottom: 10px;"><strong>Guests:</strong> ${safeGuests}</li>
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
  });
}

// Send booking notification to admin
async function sendBookingNotificationToAdmin(data: any) {
  const {
    guestName,
    guestEmail,
    adminEmail,
    property,
    checkIn,
    checkOut,
    guests,
    phone,
    specialRequests
  } = data;

  // Sanitize all user inputs
  const safeGuestName = escapeHtml(guestName);
  const safeGuestEmail = escapeHtml(guestEmail);
  const safePhone = escapeHtml(phone);
  const safeCheckIn = escapeHtml(checkIn);
  const safeCheckOut = escapeHtml(checkOut);
  const safeGuests = escapeHtml(guests);
  const safeSpecialRequests = escapeHtml(specialRequests || '');
  const propertyName = formatPropertyName(property);

  return await resend.emails.send({
    from: "Whooping Hollow Haven <onboarding@resend.dev>",
    to: [adminEmail],
    subject: "New Direct Booking Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">New Direct Booking Request</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Guest Information:</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Name:</strong> ${safeGuestName}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> ${safeGuestEmail}</li>
            <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${safePhone}</li>
            <li style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</li>
            <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${safeCheckIn}</li>
            <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${safeCheckOut}</li>
            <li style="margin-bottom: 10px;"><strong>Guests:</strong> ${safeGuests}</li>
            ${specialRequests ? `<li style="margin-bottom: 10px;"><strong>Special Requests:</strong> ${safeSpecialRequests}</li>` : ''}
          </ul>
        </div>
        
        <p>Please login to the admin panel to manage this booking request.</p>
        
        <p style="margin-top: 30px;">Automated Notification<br>Whooping Hollow Haven Booking System</p>
      </div>
    `
  });
}

// Send welcome email to guest
async function sendWelcomeEmail(data: any) {
  const {
    guestName,
    phoneNumber,
    checkInDate,
    checkOutDate,
    property,
    specialInstructions
  } = data;

  // Sanitize all user inputs
  const safeGuestName = escapeHtml(guestName);
  const safeSpecialInstructions = escapeHtml(specialInstructions || '');
  
  // Generate door code from last 4 digits of phone number (sanitize numeric only)
  const sanitizedPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  const doorCode = sanitizedPhone.slice(-4) || "0000";
  const propertyName = formatPropertyName(property || 'whooping_hollow');

  return await resend.emails.send({
    from: "Whooping Hollow Haven <onboarding@resend.dev>",
    to: [data.guestEmail || 'guest@example.com'],
    subject: `Welcome to ${propertyName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">Welcome to ${propertyName}!</h1>
        <p>Dear ${safeGuestName},</p>
        <p>We're excited to have you stay with us! Here's all the information you'll need for your upcoming stay.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Your Stay Details:</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${formatDate(checkInDate)}</li>
            <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${formatDate(checkOutDate)}</li>
            <li style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</li>
          </ul>
        </div>
        
        <div style="background-color: #e8f4ff; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #b6d9ff;">
          <h2 style="color: #1e65be; font-size: 18px; margin-top: 0;">Access Information:</h2>
          <p><strong>Door Code:</strong> ${doorCode}</p>
          <p><strong>Guest Guide Login:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>URL:</strong> https://whoopinghollowhaven.com/guide</li>
            <li><strong>Username:</strong> guest</li>
            <li><strong>Password:</strong> hollowguest2024</li>
          </ul>
          <p>The Guest Guide contains detailed information about the property, local attractions, and emergency contacts.</p>
        </div>
        
        ${specialInstructions ? `
        <div style="background-color: #fff9e8; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ffe8b6;">
          <h2 style="color: #8a6d3b; font-size: 18px; margin-top: 0;">Special Instructions:</h2>
          <p>${safeSpecialInstructions}</p>
        </div>
        ` : ''}
        
        <p>If you have any questions before or during your stay, please don't hesitate to contact us.</p>
        <p>We look forward to providing you with a wonderful stay!</p>
        
        <p style="margin-top: 30px;">Best regards,<br>The Whooping Hollow Haven Team</p>
      </div>
    `
  });
}

// Format property code to a human-readable name
function formatPropertyName(propertyCode: string): string {
  switch(propertyCode) {
    case 'whooping_hollow':
      return 'Whooping Hollow Haven (Montauk, NY)';
    case 'nashville_downtown':
      return 'Nashville Downtown Property';
    case 'nashville_music_row':
      return 'Nashville Music Row Property';
    default:
      return propertyCode.replace(/_/g, ' ');
  }
}

// Format date for email display
function formatDate(dateStr: string | Date): string {
  if (!dateStr) return '';
  
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import { format } from "npm:date-fns@2.30.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      guestName,
      checkInDate,
      checkOutDate,
      phoneNumber,
      specialInstructions,
      property
    } = await req.json()

    // Sanitize all user inputs
    const safeGuestName = escapeHtml(guestName);
    const safeSpecialInstructions = escapeHtml(specialInstructions || '');

    // Get door code from last 4 digits of phone number (sanitize numeric only)
    const sanitizedPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
    const doorCode = sanitizedPhone.slice(-4) || '0000';

    // Format dates
    const formattedCheckIn = format(new Date(checkInDate), 'EEEE, MMMM do')
    const formattedCheckOut = format(new Date(checkOutDate), 'EEEE, MMMM do')

    const propertyName = property === 'whooping_hollow' 
      ? 'Whooping Hollow Haven'
      : property === 'nashville_downtown'
        ? 'Nashville Downtown'
        : 'Nashville Music Row'

    const { data, error } = await resend.emails.send({
      from: 'Whooping Hollow Haven <onboarding@resend.dev>',
      to: 'eddie@please.co',
      subject: `Welcome to ${propertyName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to ${propertyName}, ${safeGuestName}!</h1>
          
          <p>We're excited to have you stay with us. Here's everything you need to know for your stay:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Important Details</h2>
            <p><strong>Check-in:</strong> ${formattedCheckIn}</p>
            <p><strong>Check-out:</strong> ${formattedCheckOut}</p>
            <p><strong>Door Code:</strong> ${doorCode}</p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Access Information</h2>
            <p><strong>Guest Guide Login:</strong></p>
            <p>Username: whoopinghollow</p>
            <p>Password: 26262626</p>
            <p>Visit our online guide at: https://whoopinghollow.lovable.dev/guide</p>
          </div>

          ${specialInstructions ? `
            <div style="background-color: #fff3e0; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Special Instructions</h2>
              <p>${safeSpecialInstructions}</p>
            </div>
          ` : ''}

          <p style="margin-top: 30px;">If you have any questions before or during your stay, please don't hesitate to reach out.</p>
          
          <p style="color: #666;">Best regards,<br>The ${propertyName} Team</p>
        </div>
      `,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

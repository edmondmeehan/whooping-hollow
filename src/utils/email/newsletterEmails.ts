
import { sendEmail } from './emailService';

/**
 * Sends a newsletter email to multiple recipients
 */
export const sendNewsletterEmail = async (recipients: string[], subject: string, content: string): Promise<boolean> => {
  // For better deliverability, we use BCC to hide recipient emails from each other
  return sendEmail({
    from: 'Whooping Hollow <onboarding@resend.dev>',
    to: 'onboarding@resend.dev', // Send to yourself first for testing
    bcc: recipients, // BCC all recipients 
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">${subject}</h1>
        
        <div style="line-height: 1.6;">
          ${content.replace(/\n/g, '<br>')}
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>You're receiving this email because you subscribed to our newsletter.</p>
          <p>To unsubscribe, please reply with "Unsubscribe" in the subject line.</p>
          <p>Whooping Hollow | 123 Hollow Road, Montauk, NY</p>
        </div>
      </div>
    `
  });
};

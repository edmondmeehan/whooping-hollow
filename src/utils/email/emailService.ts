
import { getResendApiKey, handleEmailError } from './emailHelpers';
import { toast } from 'sonner';

interface EmailPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  bcc?: string[];
}

/**
 * Sends an email using the Resend API
 */
export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
  const apiKey = getResendApiKey();
  
  if (!apiKey) {
    console.error("Missing Resend API key");
    toast.error("API Key Missing", {
      description: "Please add your Resend API key in the Admin panel"
    });
    return false;
  }

  try {
    // Ensure 'to' is always converted to an array for consistency
    const toAddresses = Array.isArray(payload.to) ? payload.to : [payload.to];
    
    console.log('Sending email with payload:', JSON.stringify({
      ...payload,
      to: toAddresses
    }));
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        ...payload,
        to: toAddresses
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    handleEmailError(error, 'sending email');
    return false;
  }
};

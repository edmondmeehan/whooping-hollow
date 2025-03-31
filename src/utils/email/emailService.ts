
import { getResendApiKey, handleEmailError } from './emailHelpers';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EmailPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  bcc?: string[];
}

/**
 * Sends an email using the Resend API via Supabase Edge Function
 */
export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
  try {
    console.log('Preparing to send email with payload:', JSON.stringify({
      ...payload,
      to: Array.isArray(payload.to) ? payload.to : [payload.to]
    }));
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        ...payload,
        to: Array.isArray(payload.to) ? payload.to : [payload.to]
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    handleEmailError(error, 'sending email');
    return false;
  }
};

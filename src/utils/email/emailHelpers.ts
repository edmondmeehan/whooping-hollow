
import { toast } from 'sonner';

/**
 * This function is kept for backward compatibility but is no longer used
 * as we now handle API keys via Supabase environment variables.
 */
export const getResendApiKey = (): string | null => {
  // API key now managed by Supabase edge function environment variables
  return "Using Supabase Environment Variable";
};

/**
 * Formats a date for email display
 */
export const formatDate = (date: Date): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formats a property code to a user-friendly name
 */
export const formatPropertyName = (propertyCode: string): string => {
  switch(propertyCode) {
    case 'whooping_hollow':
      return 'Whooping Hollow (Montauk, NY)';
    case 'nashville_downtown':
      return 'Nashville Downtown Property';
    case 'nashville_music_row':
      return 'Nashville Music Row Property';
    default:
      return propertyCode;
  }
};

/**
 * Handles API errors and displays a toast notification
 */
export const handleEmailError = (error: any, customMessage: string): void => {
  console.error(`Error ${customMessage}:`, error);
  toast.error(`Email Sending Failed`, {
    description: error instanceof Error ? error.message : `Failed to ${customMessage}`
  });
};

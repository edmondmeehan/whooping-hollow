
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '@/types/bookingForm';

interface SpecialRequestsFieldProps {
  form: UseFormReturn<BookingFormValues>;
}

const SpecialRequestsField: React.FC<SpecialRequestsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="specialRequests"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Special Requests</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Tell us about any special requests or questions you have..." 
              className="resize-none" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Include any details that might help us customize your stay.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SpecialRequestsField;

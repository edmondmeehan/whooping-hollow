
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '@/types/bookingForm';

interface GuestsFieldProps {
  form: UseFormReturn<BookingFormValues>;
}

const GuestsField: React.FC<GuestsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="adults"
      rules={{ required: "Number of guests is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Adults</FormLabel>
          <Select 
            onValueChange={(value) => field.onChange(parseInt(value))} 
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select number of adults" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'adult' : 'adults'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GuestsField;

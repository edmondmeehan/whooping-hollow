
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '@/types/bookingForm';

interface LocationFieldProps {
  form: UseFormReturn<BookingFormValues>;
}

const LocationField: React.FC<LocationFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="location"
      rules={{ required: "Please select a location" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property Location</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="montauk">Whooping Hollow Haven (Montauk, NY)</SelectItem>
              <SelectItem value="nashville">Nashville Properties</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;

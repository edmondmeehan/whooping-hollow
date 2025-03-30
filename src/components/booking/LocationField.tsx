
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '@/types/bookingForm';
import NashvilleProperties from './NashvilleProperties';

interface LocationFieldProps {
  form: UseFormReturn<BookingFormValues>;
}

const LocationField: React.FC<LocationFieldProps> = ({ form }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(form.getValues().property || 'whooping_hollow');

  const handleLocationChange = (value: string) => {
    form.setValue('property', value as any);
    setSelectedLocation(value);
  };

  // Initialize with the form's default value
  useEffect(() => {
    setSelectedLocation(form.getValues().property);
  }, [form]);

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="property"
        rules={{ required: "Please select a location" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Location</FormLabel>
            <FormControl>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleLocationChange(value);
                }} 
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whooping_hollow">Whooping Hollow Haven (Montauk, NY)</SelectItem>
                  <SelectItem value="nashville_downtown">Nashville Downtown</SelectItem>
                  <SelectItem value="nashville_music_row">Nashville Music Row</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {selectedLocation !== 'whooping_hollow' && <NashvilleProperties />}
    </div>
  );
};

export default LocationField;


import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const BlockingNotesField = () => {
  const { control } = useFormContext();
  
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes (optional)</FormLabel>
          <FormControl>
            <Textarea 
              {...field} 
              placeholder="Add any notes about this blocked period" 
              className="resize-none min-h-[80px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BlockingNotesField;

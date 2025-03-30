
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { User, Mail, Phone, Users, MessageCircle } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface GuestInfoFieldsProps {
  isBlocking: boolean;
}

const GuestInfoFields: React.FC<GuestInfoFieldsProps> = ({ isBlocking }) => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {isBlocking ? 'Block Description' : 'Guest Name'}
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={isBlocking ? 'e.g. Maintenance, Personal Use' : 'Guest Name'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {!isBlocking && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Adults
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      value={field.value} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Children</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      value={field.value || 0} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  Special Requests
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Any special requests or comments?" 
                    className="resize-none min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};

export default GuestInfoFields;

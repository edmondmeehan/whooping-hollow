
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LocalAreaData } from '@/hooks/use-local-area';

interface SummerEventsFormProps {
  data: LocalAreaData['summerEvents'];
  onUpdate: (data: LocalAreaData['summerEvents']) => void;
}

const SummerEventsForm: React.FC<SummerEventsFormProps> = ({ data, onUpdate }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      events: data.events.map(event => 
        `${event.name}|${event.description}|${event.dates}|${event.activities}`).join('\n'),
    }
  });
  
  const handleSubmit = (formData) => {
    const events = formData.events.split('\n')
      .map(line => {
        const parts = line.split('|');
        if (parts.length >= 4) {
          return {
            name: parts[0].trim(),
            description: parts[1].trim(),
            dates: parts[2].trim(),
            activities: parts[3].trim(),
          };
        }
        return null;
      })
      .filter(Boolean);
    
    onUpdate({
      title: formData.title,
      description: formData.description,
      events,
    });
    
    toast({
      title: "Summer Events Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summer Events</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Summer Events in East Hampton & Sag Harbor" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="Description of Summer Events..." />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Events (Name|Description|Dates|Activities - one per line)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={10} 
                      placeholder="Sag Harbor American Music Festival|An annual celebration featuring a diverse range of musical performances|Typically held in late September|Enjoy live music spanning genres from jazz to folk" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Summer Events</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default SummerEventsForm;

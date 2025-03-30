
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LocalAreaData } from '@/hooks/use-local-area';

interface InsiderTipsFormProps {
  data: LocalAreaData['insiderTips'];
  onUpdate: (data: LocalAreaData['insiderTips']) => void;
}

const InsiderTipsForm: React.FC<InsiderTipsFormProps> = ({ data, onUpdate }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: data.title,
      tips: data.tips.join('\n'),
    }
  });
  
  const handleSubmit = (formData) => {
    const tips = formData.tips.split('\n')
      .map(tip => tip.trim())
      .filter(Boolean);
    
    onUpdate({
      title: formData.title,
      tips,
    });
    
    toast({
      title: "Insider Tips Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insider Tips</CardTitle>
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
                    <Input {...field} placeholder="Insider Tips" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tips"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tips (one per line)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={8} 
                      placeholder="Avoid beach parking headaches by taking a local bike or shuttle." 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Insider Tips</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default InsiderTipsForm;

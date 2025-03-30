
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LocalAreaData } from '@/hooks/use-local-area';

interface EastHamptonFormProps {
  data: LocalAreaData['eastHampton'];
  onUpdate: (data: LocalAreaData['eastHampton']) => void;
}

const EastHamptonForm: React.FC<EastHamptonFormProps> = ({ data, onUpdate }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      highlights: data.highlights.join('\n'),
      imageUrl: data.imageUrl,
    }
  });
  
  const handleSubmit = (formData) => {
    onUpdate({
      title: formData.title,
      description: formData.description,
      highlights: formData.highlights.split('\n').map(item => item.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
    });
    
    toast({
      title: "East Hampton Content Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>East Hampton Content</CardTitle>
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
                    <Input {...field} placeholder="East Hampton: Coastal Elegance" />
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
                    <Textarea {...field} rows={3} placeholder="Description of East Hampton..." />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="highlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlights (one per line)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} placeholder="Enter each highlight on a new line..." />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com/image.jpg" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit">Save East Hampton Content</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default EastHamptonForm;

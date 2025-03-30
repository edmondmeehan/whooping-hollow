
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HeroFeature } from '@/hooks/use-hero-features';

// Schema for hero feature validation
export const heroFeatureSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  subtitle: z.string().min(2, { message: "Subtitle is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  videoUrl: z.string().url({ message: "Please enter a valid video URL." }).optional(),
});

// Type for form values
export type HeroFeatureFormValues = z.infer<typeof heroFeatureSchema>;

interface HeroFeatureFormProps {
  editingFeature: HeroFeature | null;
  onSave: (values: HeroFeatureFormValues) => void;
  onCancel: () => void;
}

const HeroFeatureForm: React.FC<HeroFeatureFormProps> = ({ 
  editingFeature, 
  onSave, 
  onCancel 
}) => {
  // Setup form
  const form = useForm<HeroFeatureFormValues>({
    resolver: zodResolver(heroFeatureSchema),
    defaultValues: editingFeature || {
      title: "",
      subtitle: "",
      imageUrl: "",
      videoUrl: ""
    }
  });
  
  // Update form when editing feature changes
  useEffect(() => {
    if (editingFeature) {
      Object.keys(editingFeature).forEach((key) => {
        if (key !== 'id') {
          // Type assertion to fix TypeScript error with dynamic keys
          const featureKey = key as keyof Omit<HeroFeature, 'id'>;
          form.setValue(featureKey, editingFeature[featureKey] || "");
        }
      });
    }
  }, [editingFeature, form]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {editingFeature ? `Edit ${editingFeature.title}` : 'Add New Feature'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter feature title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter feature subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    This image will be shown as a fallback if video cannot be played
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/video.mp4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex gap-2">
                <Save size={16} />
                {editingFeature ? 'Update Feature' : 'Add Feature'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HeroFeatureForm;

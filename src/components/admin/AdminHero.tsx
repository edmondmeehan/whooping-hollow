
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useHeroFeatures, HeroFeature } from '@/hooks/use-hero-features';
import { useForm } from 'react-hook-form';
import { Trash, PlusCircle, Save, Play, Image, Video } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Schema for hero feature validation
const heroFeatureSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  subtitle: z.string().min(2, { message: "Subtitle is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  videoUrl: z.string().url({ message: "Please enter a valid video URL." }).optional(),
});

const AdminHero = () => {
  const { heroFeatures, updateHeroFeatures } = useHeroFeatures();
  const [editingFeature, setEditingFeature] = useState<HeroFeature | null>(null);
  const { toast } = useToast();
  
  // Setup form
  const form = useForm<z.infer<typeof heroFeatureSchema>>({
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
  
  const handleEditFeature = (feature: HeroFeature) => {
    setEditingFeature(feature);
  };
  
  const handleAddNewFeature = () => {
    setEditingFeature(null);
    form.reset({
      title: "",
      subtitle: "",
      imageUrl: "",
      videoUrl: ""
    });
  };
  
  const handleSaveFeature = (values: z.infer<typeof heroFeatureSchema>) => {
    if (editingFeature && editingFeature.id) {
      // Update existing feature
      const updatedFeatures = heroFeatures.map(feature => 
        feature.id === editingFeature.id ? { ...values, id: feature.id } : feature
      );
      
      updateHeroFeatures(updatedFeatures);
      
      toast({
        title: "Feature updated",
        description: `${values.title} has been updated.`,
      });
    } else {
      // Add new feature
      const newFeature: HeroFeature = {
        ...values,
        id: `feature-${Date.now()}`
      };
      
      updateHeroFeatures([...heroFeatures, newFeature]);
      
      toast({
        title: "Feature added",
        description: `${values.title} has been added to your hero features.`,
      });
    }
    
    setEditingFeature(null);
    form.reset();
  };
  
  const handleDeleteFeature = (featureId: string) => {
    // Don't allow deleting the last feature
    if (heroFeatures.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one hero feature.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedFeatures = heroFeatures.filter(
      feature => feature.id !== featureId
    );
    
    updateHeroFeatures(updatedFeatures);
    
    toast({
      title: "Feature deleted",
      description: "The feature has been removed.",
    });
    
    if (editingFeature?.id === featureId) {
      setEditingFeature(null);
      form.reset();
    }
  };
  
  const handleCancelEdit = () => {
    setEditingFeature(null);
    form.reset();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Hero Features</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Manage Hero Features</h3>
          <Button onClick={handleAddNewFeature} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Feature
          </Button>
        </div>
        
        {/* Feature editor form */}
        {(editingFeature || (!editingFeature && form.formState.isDirty)) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingFeature ? `Edit ${editingFeature.title}` : 'Add New Feature'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveFeature)} className="space-y-4">
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
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {/* Features preview carousel */}
        {heroFeatures.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Hero Features Preview</CardTitle>
              <CardDescription>
                {heroFeatures.length > 1 
                  ? "These features will cycle on the homepage. Use the arrows to preview." 
                  : "This is how your hero section appears on the homepage."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-4xl mx-auto mb-6">
                <CarouselContent>
                  {heroFeatures.map((feature) => (
                    <CarouselItem key={feature.id}>
                      <div className="p-1">
                        <Card>
                          <div className="relative aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={feature.imageUrl} 
                              alt={feature.title}
                              className="w-full h-full object-cover"
                            />
                            {feature.videoUrl && (
                              <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full">
                                <Video className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.subtitle}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditFeature(feature)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteFeature(feature.id as string)}
                              disabled={heroFeatures.length <= 1}
                            >
                              <Trash className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {heroFeatures.length > 1 && (
                  <>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </>
                )}
              </Carousel>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminHero;

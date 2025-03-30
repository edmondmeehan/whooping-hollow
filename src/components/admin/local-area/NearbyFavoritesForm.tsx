
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LocalAreaData } from '@/hooks/use-local-area';

interface NearbyFavoritesFormProps {
  data: LocalAreaData['nearbyFavorites'];
  onUpdate: (data: LocalAreaData['nearbyFavorites']) => void;
}

const NearbyFavoritesForm: React.FC<NearbyFavoritesFormProps> = ({ data, onUpdate }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: data.title,
      favorites: data.items.map(item => 
        `${item.name}|${item.description}|${item.distance}`).join('\n'),
    }
  });
  
  const handleSubmit = (formData) => {
    const items = formData.favorites.split('\n')
      .map(line => {
        const parts = line.split('|');
        if (parts.length >= 3) {
          return {
            name: parts[0].trim(),
            description: parts[1].trim(),
            distance: parts[2].trim(),
          };
        }
        return null;
      })
      .filter(Boolean);
    
    onUpdate({
      title: formData.title,
      items,
    });
    
    toast({
      title: "Nearby Favorites Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Favorites</CardTitle>
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
                    <Input {...field} placeholder="Nearby Favorites" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="favorites"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorites (Name|Description|Distance - one per line)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={8} 
                      placeholder="Wölffer Estate Vineyard|Wine tasting with a view|20 min drive" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Nearby Favorites</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default NearbyFavoritesForm;

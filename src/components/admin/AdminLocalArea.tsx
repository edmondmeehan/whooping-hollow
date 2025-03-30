import React, { useState } from 'react';
import { useLocalArea } from '@/hooks/use-local-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Waves, Anchor, MapPin, Music, Info } from 'lucide-react';

const AdminLocalArea = () => {
  const { localAreaData, updateEastHampton, updateSagHarbor, updateInsiderTips, updateNearbyFavorites, updateSummerEvents } = useLocalArea();
  const [activeTab, setActiveTab] = useState('east-hampton');
  const { toast } = useToast();
  
  const eastHamptonForm = useForm({
    defaultValues: {
      title: localAreaData.eastHampton.title,
      description: localAreaData.eastHampton.description,
      highlights: localAreaData.eastHampton.highlights.join('\n'),
      imageUrl: localAreaData.eastHampton.imageUrl,
    }
  });
  
  const sagHarborForm = useForm({
    defaultValues: {
      title: localAreaData.sagHarbor.title,
      description: localAreaData.sagHarbor.description,
      highlights: localAreaData.sagHarbor.highlights.join('\n'),
      imageUrl: localAreaData.sagHarbor.imageUrl,
    }
  });
  
  const nearbyFavoritesForm = useForm({
    defaultValues: {
      title: localAreaData.nearbyFavorites.title,
      favorites: localAreaData.nearbyFavorites.items.map(item => 
        `${item.name}|${item.description}|${item.distance}`).join('\n'),
    }
  });
  
  const summerEventsForm = useForm({
    defaultValues: {
      title: localAreaData.summerEvents.title,
      description: localAreaData.summerEvents.description,
      events: localAreaData.summerEvents.events.map(event => 
        `${event.name}|${event.description}|${event.dates}|${event.activities}`).join('\n'),
    }
  });
  
  const insiderTipsForm = useForm({
    defaultValues: {
      title: localAreaData.insiderTips.title,
      tips: localAreaData.insiderTips.tips.join('\n'),
    }
  });
  
  const handleEastHamptonSubmit = (data) => {
    updateEastHampton({
      title: data.title,
      description: data.description,
      highlights: data.highlights.split('\n').map(item => item.trim()).filter(Boolean),
      imageUrl: data.imageUrl,
    });
    
    toast({
      title: "East Hampton Content Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleSagHarborSubmit = (data) => {
    updateSagHarbor({
      title: data.title,
      description: data.description,
      highlights: data.highlights.split('\n').map(item => item.trim()).filter(Boolean),
      imageUrl: data.imageUrl,
    });
    
    toast({
      title: "Sag Harbor Content Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleNearbyFavoritesSubmit = (data) => {
    const items = data.favorites.split('\n')
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
    
    updateNearbyFavorites({
      title: data.title,
      items,
    });
    
    toast({
      title: "Nearby Favorites Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleSummerEventsSubmit = (data) => {
    const events = data.events.split('\n')
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
    
    updateSummerEvents({
      title: data.title,
      description: data.description,
      events,
    });
    
    toast({
      title: "Summer Events Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleInsiderTipsSubmit = (data) => {
    const tips = data.tips.split('\n')
      .map(tip => tip.trim())
      .filter(Boolean);
    
    updateInsiderTips({
      title: data.title,
      tips,
    });
    
    toast({
      title: "Insider Tips Updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Local Area Content Management</h2>
      <p className="text-gray-600 mb-6">
        Edit the content that appears on the Local Area page. Changes will be immediately visible to visitors.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="east-hampton" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            <span>East Hampton</span>
          </TabsTrigger>
          <TabsTrigger value="sag-harbor" className="flex items-center gap-2">
            <Anchor className="h-4 w-4" />
            <span>Sag Harbor</span>
          </TabsTrigger>
          <TabsTrigger value="nearby-favorites" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Nearby Favorites</span>
          </TabsTrigger>
          <TabsTrigger value="summer-events" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Summer Events</span>
          </TabsTrigger>
          <TabsTrigger value="insider-tips" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Insider Tips</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="east-hampton" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>East Hampton Content</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...eastHamptonForm}>
                <form onSubmit={eastHamptonForm.handleSubmit(handleEastHamptonSubmit)} className="space-y-4">
                  <FormField
                    control={eastHamptonForm.control}
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
                    control={eastHamptonForm.control}
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
                    control={eastHamptonForm.control}
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
                    control={eastHamptonForm.control}
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
        </TabsContent>
        
        <TabsContent value="sag-harbor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sag Harbor Content</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...sagHarborForm}>
                <form onSubmit={sagHarborForm.handleSubmit(handleSagHarborSubmit)} className="space-y-4">
                  <FormField
                    control={sagHarborForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Sag Harbor: Historic & Artsy Harbor Town" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={sagHarborForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} placeholder="Description of Sag Harbor..." />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={sagHarborForm.control}
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
                    control={sagHarborForm.control}
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
                  
                  <Button type="submit">Save Sag Harbor Content</Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nearby-favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...nearbyFavoritesForm}>
                <form onSubmit={nearbyFavoritesForm.handleSubmit(handleNearbyFavoritesSubmit)} className="space-y-4">
                  <FormField
                    control={nearbyFavoritesForm.control}
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
                    control={nearbyFavoritesForm.control}
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
        </TabsContent>
        
        <TabsContent value="summer-events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Summer Events</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...summerEventsForm}>
                <form onSubmit={summerEventsForm.handleSubmit(handleSummerEventsSubmit)} className="space-y-4">
                  <FormField
                    control={summerEventsForm.control}
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
                    control={summerEventsForm.control}
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
                    control={summerEventsForm.control}
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
        </TabsContent>
        
        <TabsContent value="insider-tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insider Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...insiderTipsForm}>
                <form onSubmit={insiderTipsForm.handleSubmit(handleInsiderTipsSubmit)} className="space-y-4">
                  <FormField
                    control={insiderTipsForm.control}
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
                    control={insiderTipsForm.control}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLocalArea;

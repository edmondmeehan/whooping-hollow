
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { MapPin, Trash, PlusCircle, Save } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Create property schema for validation
const propertyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  airbnbLink: z.string().url({ message: "Please enter a valid Airbnb URL." }),
  directLink: z.string().url({ message: "Please enter a valid direct booking URL." }).optional(),
});

// Types for our properties
type Property = z.infer<typeof propertyFormSchema> & { id: string };
type PropertiesData = {
  featured: Property,
  nashville: Property[]
};

const AdminProperties = () => {
  const [propertiesData, setPropertiesData] = useState<PropertiesData>(() => {
    const savedData = localStorage.getItem('propertiesData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    // Default properties data if nothing is saved
    return {
      featured: {
        id: "wh-haven",
        name: "Whooping Hollow",
        location: "Montauk, NY",
        description: "Experience the ultimate Hamptons getaway at our luxurious retreat, nestled in the picturesque surroundings of Montauk.",
        image: "/hero-image.jpg",
        airbnbLink: "https://www.airbnb.com/rooms/1314531825053234635",
        directLink: "https://staymarquis.com/properties/the-ranch-modern"
      },
      nashville: [
        {
          id: "nash-retreat",
          name: "Nashville Retreat",
          location: "Nashville, TN",
          description: "A cozy urban retreat in the heart of Music City.",
          image: "https://images.unsplash.com/photo-1593955552559-74fc086de229?auto=format&fit=crop&q=80",
          airbnbLink: "https://www.airbnb.com/rooms/610077025200442937"
        },
        {
          id: "music-row",
          name: "Music Row Residence",
          location: "Nashville, TN",
          description: "Modern living space with great access to Nashville's famous music venues.",
          image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80",
          airbnbLink: "https://www.airbnb.com/rooms/610164155811801435"
        },
        {
          id: "nash-classic",
          name: "Nashville Classic",
          location: "Nashville, TN",
          description: "Charming property with classic Nashville character and modern amenities.",
          image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80",
          airbnbLink: "https://www.airbnb.com/rooms/14503480"
        }
      ]
    };
  });
  
  const [activeTab, setActiveTab] = useState('featured');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { toast } = useToast();
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('propertiesData', JSON.stringify(propertiesData));
  }, [propertiesData]);
  
  // Setup form
  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: editingProperty || {
      name: "",
      location: "",
      description: "",
      image: "",
      airbnbLink: "",
      directLink: ""
    }
  });
  
  // Update form when editing property changes
  useEffect(() => {
    if (editingProperty) {
      Object.keys(editingProperty).forEach((key) => {
        if (key !== 'id') {
          // Type assertion to fix TypeScript error with dynamic keys
          const propertyKey = key as keyof Omit<Property, 'id'>;
          form.setValue(propertyKey, editingProperty[propertyKey]);
        }
      });
    }
  }, [editingProperty, form]);
  
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
  };
  
  const handleSaveProperty = (values: z.infer<typeof propertyFormSchema>) => {
    if (activeTab === 'featured') {
      setPropertiesData({
        ...propertiesData,
        featured: {
          ...values,
          id: propertiesData.featured.id
        }
      });
      
      toast({
        title: "Featured property updated",
        description: "Your changes have been saved.",
      });
    } else if (editingProperty) {
      // Editing an existing Nashville property
      const updatedNashville = propertiesData.nashville.map(prop => 
        prop.id === editingProperty.id ? { ...values, id: prop.id } : prop
      );
      
      setPropertiesData({
        ...propertiesData,
        nashville: updatedNashville
      });
      
      toast({
        title: "Property updated",
        description: `${values.name} has been updated.`,
      });
    } else {
      // Adding a new Nashville property
      const newProperty: Property = {
        ...values,
        id: `nash-${Date.now()}`
      };
      
      setPropertiesData({
        ...propertiesData,
        nashville: [...propertiesData.nashville, newProperty]
      });
      
      toast({
        title: "Property added",
        description: `${values.name} has been added to your Nashville properties.`,
      });
    }
    
    setEditingProperty(null);
    form.reset();
  };
  
  const handleDeleteProperty = (propertyId: string) => {
    if (activeTab === 'nashville') {
      const updatedProperties = propertiesData.nashville.filter(
        property => property.id !== propertyId
      );
      
      setPropertiesData({
        ...propertiesData,
        nashville: updatedProperties
      });
      
      toast({
        title: "Property deleted",
        description: "The property has been removed.",
      });
      
      if (editingProperty?.id === propertyId) {
        setEditingProperty(null);
        form.reset();
      }
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProperty(null);
    form.reset();
  };
  
  const handleAddNewProperty = () => {
    setEditingProperty(null);
    form.reset({
      name: "",
      location: "Nashville, TN",
      description: "",
      image: "",
      airbnbLink: "",
      directLink: ""
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Property Management</h2>
      
      <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="featured">Featured Property</TabsTrigger>
          <TabsTrigger value="nashville">Nashville Properties</TabsTrigger>
        </TabsList>
        
        {/* Featured Property Tab Content */}
        <TabsContent value="featured">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Preview Card */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Featured Property Preview</CardTitle>
                <CardDescription>This is how your featured property appears on the site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img 
                    src={propertiesData.featured.image} 
                    alt={propertiesData.featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-hamptons-accent mr-2" />
                  <span className="text-sm text-gray-600">{propertiesData.featured.location}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{propertiesData.featured.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{propertiesData.featured.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="font-medium">Links:</div>
                  <div className="truncate">
                    <span className="font-medium">Airbnb:</span> {propertiesData.featured.airbnbLink}
                  </div>
                  {propertiesData.featured.directLink && (
                    <div className="truncate">
                      <span className="font-medium">Direct:</span> {propertiesData.featured.directLink}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleEditProperty(propertiesData.featured)}
                >
                  Edit Featured Property
                </Button>
              </CardFooter>
            </Card>
            
            {/* Edit Form */}
            {editingProperty && editingProperty.id === propertiesData.featured.id && (
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Edit Featured Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveProperty)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter property name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
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
                              <Textarea 
                                placeholder="Enter property description" 
                                className="min-h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="airbnbLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Airbnb URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://airbnb.com/rooms/123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="directLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Direct Booking URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/booking" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex gap-2">
                          <Save size={16} />
                          Save Changes
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
          </div>
        </TabsContent>
        
        {/* Nashville Properties Tab Content */}
        <TabsContent value="nashville">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Nashville Properties</h3>
              <Button onClick={handleAddNewProperty} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add New Property
              </Button>
            </div>
            
            {/* Property Form for New/Edit */}
            {(editingProperty || (!editingProperty && activeTab === 'nashville' && form.formState.isDirty)) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {editingProperty ? `Edit ${editingProperty.name}` : 'Add New Property'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveProperty)} className="space-y-4">
                      {/* Same form fields as featured property */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter property name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
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
                              <Textarea 
                                placeholder="Enter property description" 
                                className="min-h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="airbnbLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Airbnb URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://airbnb.com/rooms/123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="directLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Direct Booking URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/booking" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex gap-2">
                          <Save size={16} />
                          {editingProperty ? 'Update Property' : 'Add Property'}
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
            
            {/* Nashville Properties List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertiesData.nashville.map((property) => (
                <Card key={property.id} className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-1">
                      <MapPin className="h-4 w-4 text-hamptons-accent mr-1" />
                      <CardDescription className="truncate">{property.location}</CardDescription>
                    </div>
                    <CardTitle className="text-lg">{property.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-3">{property.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditProperty(property)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProperties;

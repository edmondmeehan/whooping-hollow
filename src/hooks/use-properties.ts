
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Types for properties
export type Property = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  airbnbLink: string;
  directLink?: string;
};

export type PropertiesData = {
  featured: Property;
  nashville: Property[];
};

// Default properties data
const defaultPropertiesData: PropertiesData = {
  featured: {
    id: "wh-haven",
    name: "The Ranch Modern",
    location: "East Hampton, NY",
    description: "Experience the ultimate Hamptons getaway at our luxurious retreat, nestled in the picturesque surroundings of East Hampton.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    airbnbLink: "https://www.airbnb.com/rooms/1314531825053234635",
    directLink: "https://staymarquis.com/properties/the-ranch-modern"
  },
  nashville: [
    {
      id: "nash-retreat",
      name: "The Jailhouse Rock",
      location: "Nashville, TN",
      description: "A cozy urban retreat in the heart of Music City.",
      image: "https://images.unsplash.com/photo-1593955552559-74fc086de229?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/610077025200442937"
    },
    {
      id: "music-row",
      name: "The Gibson",
      location: "Nashville, TN",
      description: "Modern living space with great access to Nashville's famous music venues.",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/610164155811801435"
    },
    {
      id: "nash-classic",
      name: "Let the Good Times Roll",
      location: "Nashville, TN",
      description: "Charming property with classic Nashville character and modern amenities.",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/14503480"
    }
  ]
};

// Storage key
const STORAGE_KEY = 'propertiesData';

export const useProperties = () => {
  const [propertiesData, setPropertiesData] = useState<PropertiesData>(() => {
    // Load from localStorage if available
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : defaultPropertiesData;
  });
  
  const { toast } = useToast();

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(propertiesData));
  }, [propertiesData]);

  // Update the featured property
  const updateFeaturedProperty = (property: Property) => {
    setPropertiesData({
      ...propertiesData,
      featured: {
        ...property,
        id: propertiesData.featured.id
      }
    });
    
    toast({
      title: "Featured property updated",
      description: "Your changes have been saved.",
    });
  };

  // Add a new Nashville property
  const addNashvilleProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: `nash-${Date.now()}`
    };
    
    setPropertiesData({
      ...propertiesData,
      nashville: [...propertiesData.nashville, newProperty]
    });
    
    toast({
      title: "Property added",
      description: `${property.name} has been added to your Nashville properties.`,
    });
    
    return newProperty;
  };

  // Update an existing Nashville property
  const updateNashvilleProperty = (propertyId: string, property: Omit<Property, 'id'>) => {
    const updatedNashville = propertiesData.nashville.map(prop => 
      prop.id === propertyId ? { ...property, id: prop.id } : prop
    );
    
    setPropertiesData({
      ...propertiesData,
      nashville: updatedNashville
    });
    
    toast({
      title: "Property updated",
      description: `${property.name} has been updated.`,
    });
  };

  // Delete a Nashville property
  const deleteNashvilleProperty = (propertyId: string) => {
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
  };

  return {
    propertiesData,
    updateFeaturedProperty,
    addNashvilleProperty,
    updateNashvilleProperty,
    deleteNashvilleProperty
  };
};


import { useState, useEffect } from 'react';
import { Property } from '@/components/admin/services/PropertySelector';

// We're hardcoding properties for now, but this could be connected to a database in the future
const DEFAULT_PROPERTIES: Property[] = [
  { id: '26-whooping-hollow', name: '26 Whooping Hollow' },
  { id: '1304b-montgomery', name: '1304B Montgomery' },
  { id: '402-cleveland', name: '402 Cleveland' }
];

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);

  const selectProperty = (propertyId: string | undefined) => {
    setSelectedProperty(propertyId);
  };

  // You could add methods here to add/edit/delete properties in the future

  return {
    properties,
    selectedProperty,
    selectProperty
  };
};


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface Property {
  id: string;
  name: string;
}

interface PropertySelectorProps {
  properties: Property[];
  selectedProperty: string | undefined;
  onPropertyChange: (property: string | undefined) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({ 
  properties, 
  selectedProperty, 
  onPropertyChange 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="property-select">Property</Label>
      <Select 
        value={selectedProperty || "all"} 
        onValueChange={(value) => onPropertyChange(value === "all" ? undefined : value)}
      >
        <SelectTrigger id="property-select" className="w-full md:w-[260px]">
          <SelectValue placeholder="Select a property" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>
          {properties.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              {property.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PropertySelector;

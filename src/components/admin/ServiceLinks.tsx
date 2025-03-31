
import React from 'react';
import EditableExternalServiceLinks from './services/EditableExternalServiceLinks';
import HomeSystems from './services/HomeSystems';
import EditableHouseServicesDirectory from './services/EditableHouseServicesDirectory';
import { useProperties } from '@/hooks/admin/use-properties';
import PropertySelector from './services/PropertySelector';

const ServiceLinks = () => {
  const { properties, selectedProperty, selectProperty } = useProperties();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <PropertySelector 
          properties={properties}
          selectedProperty={selectedProperty}
          onPropertyChange={selectProperty}
        />
      </div>
      
      <EditableExternalServiceLinks property={selectedProperty} />
      <HomeSystems property={selectedProperty} />
      <EditableHouseServicesDirectory property={selectedProperty} />
    </div>
  );
};

export default ServiceLinks;

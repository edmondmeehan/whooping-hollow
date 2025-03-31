
import React, { useState } from 'react';
import EditableExternalServiceLinks from './services/EditableExternalServiceLinks';
import HomeSystems from './services/HomeSystems';
import EditableHouseServicesDirectory from './services/EditableHouseServicesDirectory';
import { useProperties } from '@/hooks/admin/use-properties';
import PropertySelector from './services/PropertySelector';

const ServiceLinks = () => {
  const { properties, selectedProperty, selectProperty } = useProperties();

  return (
    <div className="space-y-6">
      <EditableExternalServiceLinks />
      <HomeSystems />
      <EditableHouseServicesDirectory />
    </div>
  );
};

export default ServiceLinks;

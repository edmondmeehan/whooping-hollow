
import React from 'react';
import EditableExternalServiceLinks from './services/EditableExternalServiceLinks';
import HomeSystems from './services/HomeSystems';
import EditableHouseServicesDirectory from './services/EditableHouseServicesDirectory';

const ServiceLinks = () => {
  return (
    <div className="space-y-6">
      <EditableExternalServiceLinks />
      <HomeSystems />
      <EditableHouseServicesDirectory />
    </div>
  );
};

export default ServiceLinks;

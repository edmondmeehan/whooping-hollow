
import React from 'react';
import ExternalServiceLinks from './services/ExternalServiceLinks';
import HomeSystems from './HomeSystems';
import HouseServicesDirectory from './services/HouseServicesDirectory';

const ServiceLinks = () => {
  return (
    <div className="space-y-6">
      <ExternalServiceLinks />
      <HomeSystems />
      <HouseServicesDirectory />
    </div>
  );
};

export default ServiceLinks;

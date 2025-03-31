
import React from 'react';
import { Home, Info, Wifi } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useGuideCredentials } from '@/hooks/use-guide-credentials';

const WelcomeTab = () => {
  // Hard-coded WiFi credentials
  const wifiNetwork = "whoopinghollow";
  const wifiPassword = "26262626";

  return (
    <>
      <GuideSection title="Welcome to Whooping Hollow" icon={<Home />}>
        <div className="space-y-4">
          <p>
            Welcome to Whooping Hollow in East Hampton! We're delighted to have you stay with us. 
            This guide contains everything you need to know to make your stay comfortable and enjoyable.
          </p>
          <p>
            Please take a moment to read through the information provided. If you have any questions 
            or need assistance during your stay, don't hesitate to contact us.
          </p>
          <p className="font-medium">
            We hope you have a wonderful stay!
          </p>
        </div>
      </GuideSection>
      
      <GuideSection title="House Rules" icon={<Info />}>
        <div className="space-y-4">
          <p className="font-medium">Please observe the following rules during your stay:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No smoking inside the house</li>
            <li>No parties or events without prior approval</li>
            <li>Please be mindful of noise levels, especially after 10 PM</li>
            <li>No pets allowed without prior approval</li>
            <li>Please remove shoes inside the house</li>
            <li>Do not rearrange furniture</li>
            <li>Please lock all doors and windows when leaving the property</li>
          </ul>
        </div>
      </GuideSection>
      
      <GuideSection title="Wi-Fi Information" icon={<Wifi />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Network Name:</p>
            <p className="font-mono bg-white p-2 rounded border">{wifiNetwork}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Password:</p>
            <p className="font-mono bg-white p-2 rounded border">{wifiPassword}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          If you experience any connectivity issues, please try restarting the router located in the living room.
        </p>
      </GuideSection>
    </>
  );
};

export default WelcomeTab;

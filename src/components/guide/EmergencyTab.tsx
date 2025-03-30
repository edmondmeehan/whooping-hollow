
import React from 'react';
import { Phone } from 'lucide-react';
import GuideSection from '../GuideSection';

const EmergencyTab = () => {
  return (
    <GuideSection title="Emergency Contacts" icon={<Phone />}>
      <div className="space-y-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h3 className="font-medium text-red-800 mb-2">In case of emergency, dial 911</h3>
          <p className="text-sm text-red-700">
            Our exact address is: 26 Whooping Hollow Road, East Hampton, NY
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Important Phone Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">Owner</h4>
              <p className="text-sm text-gray-600 mb-1">Eddie</p>
              <p className="font-medium">(916) 616-5376</p>
              <p className="text-sm">eddie@please.co</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">Handyman</h4>
              <p className="text-sm text-gray-600 mb-1">John Sebastian Ramirez (Prestine Management)</p>
              <p className="font-medium">(631) 605-0294</p>
              <p className="text-sm">prestinemanagement631@gmail.com</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">Cleaning Service</h4>
              <p className="text-sm text-gray-600 mb-1">Isabel Acevedo (Sisters Cleaning)</p>
              <p className="font-medium">(631) 833-7932</p>
              <p className="text-sm">isabelacevedop@gmail.com</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">Property Manager</h4>
              <p className="text-sm text-gray-600 mb-1">Stay Marquis</p>
              <p className="font-medium">(631) 301-2960</p>
              <p className="text-sm">maintenance@staymarquis.com</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">East Hampton Hospital</h4>
              <p className="text-sm text-gray-600 mb-1">201 Southampton Rd, East Hampton</p>
              <p className="font-medium">(631) 324-8400</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">Police (Non-Emergency)</h4>
              <p className="text-sm text-gray-600 mb-1">East Hampton Police Department</p>
              <p className="font-medium">(631) 324-0777</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Home Emergency Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Water Shut-off:</span> Located in the basement, near the water heater.
            </li>
            <li>
              <span className="font-medium">Circuit Breaker:</span> Located in the garage on the left wall.
            </li>
            <li>
              <span className="font-medium">Fire Extinguisher:</span> Located in the kitchen, under the sink.
            </li>
            <li>
              <span className="font-medium">First Aid Kit:</span> Located in the main bathroom cabinet.
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Weather Emergencies</h3>
          <p className="text-sm text-blue-700 mb-2">
            In case of severe weather or other natural emergencies, please:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
            <li>Stay informed via local news or weather.gov</li>
            <li>Follow any evacuation orders if issued</li>
            <li>Flashlights are located in the kitchen drawer</li>
            <li>Contact the property manager for guidance</li>
          </ul>
        </div>
      </div>
    </GuideSection>
  );
};

export default EmergencyTab;

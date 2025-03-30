
import React from 'react';
import { Phone, AlertTriangle, Thermometer, Hospital, CloudLightning } from 'lucide-react';
import GuideSection from '../GuideSection';
import WeatherWidget from '../WeatherWidget';

const EmergencyTab = () => {
  return (
    <>
      <GuideSection title="Current Weather" icon={<CloudLightning />}>
        <div className="p-2">
          <WeatherWidget location="East Hampton, NY" />
        </div>
      </GuideSection>
      
      <GuideSection title="Emergency Contacts" icon={<Phone />}>
        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-medium text-red-800 mb-2">In case of emergency, dial 911</h3>
            <p className="text-sm text-red-700">
              Our exact address is: [Address available in guest guide]
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
        </div>
      </GuideSection>
      
      <GuideSection title="Home Emergency Information" icon={<AlertTriangle />}>
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
            <h3 className="font-medium text-amber-800 mb-2">Critical Home Systems</h3>
            <ul className="list-disc pl-6 space-y-2 text-amber-700">
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
          
          <div>
            <h3 className="font-medium mb-3">Fire Safety</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Smoke detectors are located in every bedroom and common area</li>
              <li>In case of fire, evacuate immediately and call 911</li>
              <li>Meet at the mailbox at the end of the driveway</li>
              <li>Do not re-enter the house until authorities give permission</li>
            </ul>
          </div>
        </div>
      </GuideSection>
      
      <GuideSection title="Weather Emergencies" icon={<Thermometer />}>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Severe Weather Protocols</h3>
            <p className="text-sm text-blue-700 mb-2">
              In case of severe weather or other natural emergencies, please:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
              <li>Stay informed via local news or weather.gov</li>
              <li>Follow any evacuation orders if issued</li>
              <li>Flashlights are located in the kitchen drawer</li>
              <li>Battery-powered radio is in the living room cabinet</li>
              <li>Extra batteries are in the utility drawer in the kitchen</li>
              <li>Contact the property manager for guidance</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-3">Hurricane/Storm Safety</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>If a hurricane warning is issued, secure all outdoor furniture</li>
              <li>Close and lock all windows and exterior doors</li>
              <li>Unplug electronic devices if lightning is expected</li>
              <li>If power goes out, the emergency generator will activate automatically</li>
              <li>Emergency water supply is stored in the basement</li>
            </ol>
          </div>
        </div>
      </GuideSection>
      
      <GuideSection title="Medical Emergencies" icon={<Hospital />}>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
            <h3 className="font-medium text-green-800 mb-2">Nearest Medical Facilities</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">East Hampton Hospital</h4>
                <p className="text-sm">201 Southampton Road, East Hampton, NY</p>
                <p className="text-sm">10 minutes drive • (631) 324-8400</p>
                <p className="text-sm text-green-700">Emergency Room available 24/7</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">CityMD Urgent Care</h4>
                <p className="text-sm">100 Pantigo Place, East Hampton, NY</p>
                <p className="text-sm">5 minutes drive • (631) 324-5900</p>
                <p className="text-sm text-green-700">Open 8AM-8PM, 7 days a week</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">East Hampton Pharmacy</h4>
                <p className="text-sm">67 Main Street, East Hampton, NY</p>
                <p className="text-sm">7 minutes drive • (631) 324-0077</p>
                <p className="text-sm text-green-700">Open Mon-Sat 9AM-6PM, Sun 9AM-3PM</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">In Case of Medical Emergency</h3>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Call 911 immediately</li>
              <li>Provide the property address (available in the guest guide)</li>
              <li>Follow dispatcher instructions until help arrives</li>
              <li>If possible, contact the property owner or manager</li>
            </ol>
          </div>
        </div>
      </GuideSection>
    </>
  );
};

export default EmergencyTab;

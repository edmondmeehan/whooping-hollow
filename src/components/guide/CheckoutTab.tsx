
import React from 'react';
import { Clock } from 'lucide-react';
import GuideSection from '../GuideSection';

const CheckoutTab = () => {
  return (
    <GuideSection title="Check-out Instructions" icon={<Clock />}>
      <div className="space-y-4">
        <p>Check-out time is 11:00 AM. Late check-out may be available upon request.</p>
        <p className="font-medium">Before departing, please:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Wash and put away all dishes, or start the dishwasher</li>
          <li>Remove all food from the refrigerator</li>
          <li>Take out all trash and recycling to the appropriate bins</li>
          <li>Close and lock all windows and doors</li>
          <li>Turn off all lights, fans, and electronics</li>
          <li>Set the thermostat to 75°F in summer or 65°F in winter</li>
          <li>Return the house key to the lockbox</li>
        </ul>
        <p>
          Thank you for staying with us. We hope you enjoyed your time at Whooping Hollow!
        </p>
      </div>
    </GuideSection>
  );
};

export default CheckoutTab;

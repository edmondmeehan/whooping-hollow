
import React from 'react';
import { Clock, Zap, Trash } from 'lucide-react';
import GuideSection from '../GuideSection';

const HouseInfoTab = () => {
  return (
    <>
      <GuideSection title="Check-in Instructions" icon={<Clock />}>
        <div className="space-y-4">
          <p>Check-in time is 3:00 PM. Early check-in may be available upon request.</p>
          <p className="font-medium">To access the property:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Locate the lockbox to the right of the front door</li>
            <li>Enter the code provided by the owner</li>
            <li>Take the key and unlock the front door</li>
            <li>Return the key to the lockbox when you leave</li>
          </ol>
          <p>
            Upon entering, you'll find a welcome binder with additional information about the house.
          </p>
        </div>
      </GuideSection>
      
      <GuideSection title="Appliance Instructions" icon={<Zap />}>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Kitchen Appliances</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Oven:</span> Turn the dial to select temperature. Press the "Start" button to begin preheating.
              </li>
              <li>
                <span className="font-medium">Dishwasher:</span> Add detergent to the dispenser, select cycle, and press "Start". Please run the dishwasher before check-out.
              </li>
              <li>
                <span className="font-medium">Coffee Maker:</span> Add water to the reservoir, place coffee grounds in the filter, and press the power button.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Thermostat</h3>
            <p>
              The thermostat is located in the main hallway. Press the up/down arrows to adjust the temperature. 
              Please keep the temperature between 68-78°F for energy efficiency.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">TV & Entertainment</h3>
            <p>
              Use the black remote for the TV and the gray remote for the sound system. Netflix, Hulu, and 
              Amazon Prime are available. Please use the guest account.
            </p>
          </div>
        </div>
      </GuideSection>
      
      <GuideSection title="Trash & Recycling Information" icon={<Trash />}>
        <div className="space-y-4">
          <p>
            Trash and recycling bins are located on the side of the house. Please separate your waste according to these guidelines:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Trash (Black Bin)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Food waste</li>
                <li>Plastic wrap</li>
                <li>Disposable cups and plates</li>
                <li>Other non-recyclable items</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Recycling (Blue Bin)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Glass bottles and jars</li>
                <li>Plastic containers (#1-7)</li>
                <li>Paper and cardboard</li>
                <li>Metal cans</li>
              </ul>
            </div>
          </div>
          <p>
            Trash collection is on Monday mornings. If you're staying over a Monday, please place the bins at the end of the driveway.
          </p>
        </div>
      </GuideSection>
    </>
  );
};

export default HouseInfoTab;

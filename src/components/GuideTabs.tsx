import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Home, 
  Info, 
  Wifi, 
  MapPin, 
  Utensils, 
  Phone, 
  Car, 
  Clock, 
  Trash,
  Zap
} from 'lucide-react';
import GuideSection from './GuideSection';

const GuideTabs = () => {
  return (
    <Tabs defaultValue="welcome" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="welcome" className="py-3">Welcome</TabsTrigger>
        <TabsTrigger value="house" className="py-3">House Info</TabsTrigger>
        <TabsTrigger value="local" className="py-3">Local Area</TabsTrigger>
        <TabsTrigger value="checkout" className="py-3">Check-out</TabsTrigger>
        <TabsTrigger value="emergency" className="py-3">Emergency</TabsTrigger>
      </TabsList>
      
      <div className="mt-8">
        <TabsContent value="welcome">
          <GuideSection title="Welcome to Whooping Hollow" icon={<Home />}>
            <div className="space-y-4">
              <p>
                Welcome to 26 Whooping Hollow in East Hampton! We're delighted to have you stay with us. 
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
                <p className="font-mono bg-white p-2 rounded border">whoppinghollow</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Password:</p>
                <p className="font-mono bg-white p-2 rounded border">262626</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              If you experience any connectivity issues, please try restarting the router located in the living room.
            </p>
          </GuideSection>
        </TabsContent>
        
        <TabsContent value="house">
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
        </TabsContent>
        
        <TabsContent value="local">
          <GuideSection title="Directions & Location" icon={<MapPin />}>
            <div className="space-y-4">
              <p>
                Our property is located at 26 Whooping Hollow, East Hampton, NY. 
                Here's how to find us and get around the area:
              </p>
              
              <div className="aspect-video w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.307730942427!2d-72.19651807371809!3d40.96565258650138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e88a65a7a7b4b3%3A0xbe82a34a88c4b2a6!2sEast%20Hampton%2C%20NY!5e0!3m2!1sen!2sus!4v1665761408294!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                  className="rounded-lg shadow-sm"
                ></iframe>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">From New York City:</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Take I-495 E/Long Island Expressway</li>
                  <li>Follow signs for The Hamptons/Montauk Highway</li>
                  <li>Turn onto Whooping Hollow Road</li>
                  <li>Our house is #26 on the right side</li>
                </ol>
              </div>
            </div>
          </GuideSection>
          
          <GuideSection title="Local Recommendations" icon={<Utensils />}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Restaurants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Nick & Toni's</h4>
                    <p className="text-sm text-gray-600 mb-2">Upscale Italian, reservation recommended</p>
                    <p className="text-sm">136 N Main St, East Hampton</p>
                    <p className="text-sm">5 min drive</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Rowdy Hall</h4>
                    <p className="text-sm text-gray-600 mb-2">Casual pub fare, great for lunch</p>
                    <p className="text-sm">10 Main St, East Hampton</p>
                    <p className="text-sm">7 min drive</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">The 1770 House</h4>
                    <p className="text-sm text-gray-600 mb-2">Fine dining in historic setting</p>
                    <p className="text-sm">143 Main St, East Hampton</p>
                    <p className="text-sm">6 min drive</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Highway Restaurant</h4>
                    <p className="text-sm text-gray-600 mb-2">American cuisine with seasonal menu</p>
                    <p className="text-sm">290 Montauk Hwy, East Hampton</p>
                    <p className="text-sm">10 min drive</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Beaches</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Main Beach</h4>
                    <p className="text-sm text-gray-600 mb-2">Popular, lifeguards on duty</p>
                    <p className="text-sm">15 min drive</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Georgica Beach</h4>
                    <p className="text-sm text-gray-600 mb-2">Less crowded, scenic views</p>
                    <p className="text-sm">12 min drive</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">LongHouse Reserve</h4>
                    <p className="text-sm text-gray-600 mb-2">Sculpture garden and art</p>
                    <p className="text-sm">10 min drive</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Wolffer Estate Vineyard</h4>
                    <p className="text-sm text-gray-600 mb-2">Wine tasting and tours</p>
                    <p className="text-sm">20 min drive</p>
                  </div>
                </div>
              </div>
            </div>
          </GuideSection>
          
          <GuideSection title="Transportation & Parking" icon={<Car />}>
            <div className="space-y-4">
              <p>
                Our driveway can accommodate up to 3 vehicles. Street parking is also available without restrictions.
              </p>
              
              <div>
                <h3 className="font-medium mb-2">Local Transportation Options:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Uber/Lyft:</span> Available in the area, but can be limited especially during peak season.
                  </li>
                  <li>
                    <span className="font-medium">Hampton Jitney:</span> Bus service to/from NYC with a stop in East Hampton town. Schedule available at hamptonjitney.com.
                  </li>
                  <li>
                    <span className="font-medium">Local Taxi:</span> East Hampton Town Taxi - (631) 324-TAXI.
                  </li>
                  <li>
                    <span className="font-medium">Bicycle Rentals:</span> East Hampton Bicycles - (631) 324-5977.
                  </li>
                </ul>
              </div>
            </div>
          </GuideSection>
        </TabsContent>
        
        <TabsContent value="checkout">
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
        </TabsContent>
        
        <TabsContent value="emergency">
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
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GuideTabs;

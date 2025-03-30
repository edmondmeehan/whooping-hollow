
import React from 'react';
import { MapPin, Utensils, Car } from 'lucide-react';
import GuideSection from '../GuideSection';

const LocalAreaTab = () => {
  return (
    <>
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
    </>
  );
};

export default LocalAreaTab;

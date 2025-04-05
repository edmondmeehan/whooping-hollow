
import React from 'react';
import { Wifi, Tv, Utensils, Car, Waves, Thermometer, Coffee, Wind } from 'lucide-react';

const Features = () => {
  const amenities = [
    { icon: <Wifi className="amenity-icon" />, name: 'High-Speed WiFi' },
    { icon: <Tv className="amenity-icon" />, name: 'Smart TV' },
    { icon: <Utensils className="amenity-icon" />, name: 'Fully Equipped Kitchen' },
    { icon: <Car className="amenity-icon" />, name: 'Free Parking' },
    { icon: <Waves className="amenity-icon" />, name: 'Swimming Pool' },
    { icon: <Thermometer className="amenity-icon" />, name: 'Central AC & Heating' },
    { icon: <Coffee className="amenity-icon" />, name: 'Coffee Maker' },
    { icon: <Wind className="amenity-icon" />, name: 'Outdoor Space' },
  ];

  return (
    <section className="section-padding bg-coastal-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-hamptons-dark mb-4">
            Amenities & Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need for a comfortable and luxurious stay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md card-hover border-t-2 border-coastal-300"
            >
              <div className="flex items-center mb-4">
                {amenity.icon}
                <h3 className="ml-3 font-medium text-hamptons-dark">{amenity.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Enjoy our {amenity.name.toLowerCase()} during your stay at Whooping Hollow.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            And many more amenities to make your stay comfortable and enjoyable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;

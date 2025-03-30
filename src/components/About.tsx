
import React from 'react';
import { MapPin, Users, Home, Star } from 'lucide-react';
import { useProperties } from '../hooks/use-properties';

const About = () => {
  const { propertiesData } = useProperties();
  const { featured } = propertiesData;

  return (
    <section id="about" className="section-padding bg-hamptons-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-hamptons-dark mb-4">
            Welcome to Whooping Hollow
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your exclusive East Hampton retreat awaits – a sanctuary of luxury and tranquility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-hamptons-dark mb-4">
              {featured.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Discover the ultimate Hamptons escape in our meticulously designed modern retreat. 
              Nestled in the heart of East Hampton, this home offers an unparalleled blend of sophistication and comfort.
            </p>
            <p className="text-gray-600 mb-6">
              Just 5 minutes from both East Hampton Downtown and Sag Harbor Downtown, our property serves 
              as your perfect base for exploring the unmatched beauty and charm of the East End.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center">
                <MapPin className="text-coastal-600 mr-2" size={20} />
                <span className="text-gray-700">East Hampton, NY</span>
              </div>
              <div className="flex items-center">
                <Users className="text-coastal-600 mr-2" size={20} />
                <span className="text-gray-700">Up to 8 guests</span>
              </div>
              <div className="flex items-center">
                <Home className="text-coastal-600 mr-2" size={20} />
                <span className="text-gray-700">4 bedrooms</span>
              </div>
              <div className="flex items-center">
                <Star className="text-coastal-600 mr-2" size={20} />
                <span className="text-gray-700">5.0 rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={featured.image} 
              alt={featured.name} 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                <span className="text-sm font-medium">Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

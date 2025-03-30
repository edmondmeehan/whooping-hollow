
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
            Experience the perfect blend of luxury and comfort in our East Hampton retreat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-hamptons-dark mb-4">
              {featured.name}
            </h3>
            <p className="text-gray-600 mb-6">
              {featured.description}
            </p>
            <p className="text-gray-600 mb-6">
              Whether you're looking to explore the beautiful beaches, visit local vineyards, 
              or simply relax in a peaceful environment, our home provides the ideal base for 
              your Hamptons adventure.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center">
                <MapPin className="text-coastal-600 mr-2" size={20} />
                <span className="text-gray-700">{featured.location}</span>
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

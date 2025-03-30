
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, Users, MapPin, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useProperties } from '@/hooks/use-properties';

const Properties = () => {
  const { propertiesData } = useProperties();
  const { featured, nashville } = propertiesData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container-custom pt-32 pb-20">
        <h1 className="text-4xl font-serif font-bold text-center mb-4">Our Properties</h1>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our collection of premium vacation properties in Montauk and Nashville, 
          designed for unforgettable getaways.
        </p>
        
        {/* Featured Property */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-semibold mb-6">Featured Property</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featured.image} 
                  alt={featured.name}
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-hamptons-accent mr-2" />
                  <span className="text-sm text-gray-600">{featured.location}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">{featured.name}</h3>
                <p className="text-gray-600 mb-6">{featured.description}</p>
                <div className="space-y-3">
                  {featured.directLink ? (
                    <>
                      <Button className="w-full" asChild>
                        <Link to="/book-direct" className="flex items-center justify-center">
                          Book Directly & Save
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={featured.directLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View on Official Site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="secondary" className="w-full" asChild>
                        <a href={featured.airbnbLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" asChild>
                        <Link to="/book-direct" className="flex items-center justify-center">
                          Request Direct Booking
                        </Link>
                      </Button>
                      <Button variant="secondary" className="w-full" asChild>
                        <a href={featured.airbnbLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Nashville Properties */}
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6">Our Nashville Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nashville.map((property, index) => (
              <Card key={property.id} className="card-hover">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-hamptons-accent mr-2" />
                    <CardDescription>{property.location}</CardDescription>
                  </div>
                  <CardTitle>{property.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{property.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full" asChild>
                    <Link to="/book-direct" className="flex items-center justify-center">
                      Book Directly & Save
                    </Link>
                  </Button>
                  {property.directLink && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={property.directLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        View Official Site <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="secondary" className="w-full" asChild>
                    <a href={property.airbnbLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      View on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Direct Booking CTA */}
        <div className="mt-16 text-center bg-secondary/20 rounded-xl p-8">
          <h2 className="text-2xl font-serif font-bold mb-3">Save on Your Next Stay</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Rent directly from the owner and save on booking fees. 
            Fill out our simple form to request a special direct booking discount.
          </p>
          <Button size="lg" asChild>
            <Link to="/book-direct">Request Direct Booking</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;

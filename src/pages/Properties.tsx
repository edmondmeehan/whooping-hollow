
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, Users, MapPin, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Properties = () => {
  const whHavenProperty = {
    name: "Whooping Hollow Haven",
    location: "Montauk, NY",
    description: "Experience the ultimate Hamptons getaway at our luxurious retreat, nestled in the picturesque surroundings of Montauk.",
    image: "/hero-image.jpg",
    airbnbLink: "https://www.airbnb.com/rooms/1314531825053234635?adults=1&children=0&infants=0&pets=0&wishlist_item_id=11004381825188&check_in=2025-06-27&check_out=2025-06-29&source_impression_id=p3_1740712889_P3Dil4tMhv8FPk2o",
    directLink: "https://staymarquis.com/properties/the-ranch-modern"
  };
  
  const nashvilleProperties = [
    {
      name: "Nashville Retreat",
      location: "Nashville, TN",
      description: "A cozy urban retreat in the heart of Music City.",
      image: "https://images.unsplash.com/photo-1593955552559-74fc086de229?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/610077025200442937?adults=1&children=0&infants=0&pets=0&wishlist_item_id=11004416940518&source_impression_id=p3_1743342584_P34YaDGCeLx4fCtQ"
    },
    {
      name: "Music Row Residence",
      location: "Nashville, TN",
      description: "Modern living space with great access to Nashville's famous music venues.",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/610164155811801435?adults=1&children=0&infants=0&pets=0&wishlist_item_id=11004416940406&source_impression_id=p3_1743342643_P3Y85Vlhdjnz4XY-"
    },
    {
      name: "Nashville Classic",
      location: "Nashville, TN",
      description: "Charming property with classic Nashville character and modern amenities.",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80",
      airbnbLink: "https://www.airbnb.com/rooms/14503480?adults=1&children=0&infants=0&pets=0&wishlist_item_id=11004381824416&source_impression_id=p3_1743342657_P3L9ImegiCm9iq3_"
    }
  ];

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
                  src={whHavenProperty.image} 
                  alt={whHavenProperty.name}
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-hamptons-accent mr-2" />
                  <span className="text-sm text-gray-600">{whHavenProperty.location}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">{whHavenProperty.name}</h3>
                <p className="text-gray-600 mb-6">{whHavenProperty.description}</p>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={whHavenProperty.airbnbLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      Book on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={whHavenProperty.directLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      Book Directly <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/book-direct" className="flex items-center justify-center">
                      Request Direct Booking Discount
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Nashville Properties */}
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6">Our Nashville Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nashvilleProperties.map((property, index) => (
              <Card key={index} className="card-hover">
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
                <CardFooter>
                  <Button className="w-full" asChild>
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

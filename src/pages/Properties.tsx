
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/use-properties';

const Properties = () => {
  const { propertiesData } = useProperties();
  const { featured } = propertiesData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container-custom pt-32 pb-20">
        <h1 className="text-4xl font-serif font-bold text-center mb-4">Reserve Your Stay</h1>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Book your East Hampton getaway through one of our trusted booking partners.
        </p>
        
        {/* Featured Property */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featured.image} 
                  alt={featured.name}
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-accent mr-2" />
                  <span className="text-sm text-muted-foreground">{featured.location}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold mb-3 text-foreground">{featured.name}</h2>
                <p className="text-muted-foreground mb-8">{featured.description}</p>
                <div className="space-y-3">
                  {featured.directLink && (
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-wider text-sm" asChild>
                      <a href={featured.directLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Book on Stay Marquis <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full font-semibold uppercase tracking-wider text-sm" asChild>
                    <a href={featured.airbnbLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      Book on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;

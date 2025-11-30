
import React from 'react';
import { MapPin, Users, Home, Star } from 'lucide-react';
import { useProperties } from '../hooks/use-properties';

const About = () => {
  const { propertiesData } = useProperties();
  const { featured } = propertiesData;

  return (
    <section id="about" className="section-padding sand-gradient">
      <div className="container-custom">
        <div className="text-center mb-20">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Premier Location</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 luxury-text">
            Your East Hampton Haven
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An architectural masterpiece where sophisticated design meets the timeless allure of the Hamptons coastline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 luxury-text">
              {featured.name}
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Immerse yourself in unparalleled luxury at our meticulously curated East Hampton estate. 
              This architectural gem seamlessly blends contemporary elegance with coastal sophistication, 
              offering an intimate retreat for the discerning traveler.
            </p>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Perfectly positioned between East Hampton Village and Sag Harbor—each just 5 minutes away—
              you'll enjoy effortless access to world-class dining, pristine beaches, boutique shopping, 
              and the area's most coveted cultural attractions.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10 p-6 bg-card rounded-2xl shadow-[var(--shadow-soft)] border border-border">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Prime Location</p>
                  <p className="text-sm text-muted-foreground">East Hampton, NY</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Sleeps 8</p>
                  <p className="text-sm text-muted-foreground">Comfortably</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">4 Bedrooms</p>
                  <p className="text-sm text-muted-foreground">Luxury suites</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">5-Star Rated</p>
                  <p className="text-sm text-muted-foreground">Exceptional stays</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <img 
              src={featured.image} 
              alt={featured.name} 
              className="relative rounded-2xl shadow-[var(--shadow-elegant)] w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-[var(--shadow-elegant)] border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full w-4 h-4 animate-pulse"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Available Now</p>
                  <p className="text-xs text-muted-foreground">Book your dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

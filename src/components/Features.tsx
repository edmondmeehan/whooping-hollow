
import React from 'react';
import { Wifi, Sparkles, Utensils, Waves, Wind, Home, Users, Wine } from 'lucide-react';

const Features = () => {
  const amenities = [
    { icon: <Sparkles className="amenity-icon" />, name: 'Concierge Service', description: 'Personalized assistance for reservations and experiences' },
    { icon: <Waves className="amenity-icon" />, name: 'Heated Pool & Hot Tub', description: 'Private saltwater pool with spa overlooking gardens' },
    { icon: <Utensils className="amenity-icon" />, name: 'Chef\'s Kitchen', description: 'Gourmet kitchen with premium appliances' },
    { icon: <Wind className="amenity-icon" />, name: 'Outdoor Living', description: 'Expansive terraces with lounge and dining areas' },
    { icon: <Wifi className="amenity-icon" />, name: 'High-Speed WiFi', description: 'Fiber optic internet throughout the property' },
    { icon: <Home className="amenity-icon" />, name: 'Luxury Linens', description: 'Premium bedding and plush towels' },
    { icon: <Users className="amenity-icon" />, name: 'Entertainment Space', description: 'Media room with state-of-the-art sound system' },
    { icon: <Wine className="amenity-icon" />, name: 'Wine Cellar', description: 'Temperature-controlled storage for your collection' },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-20">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Luxury Amenities</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 luxury-text">
            Designed for Comfort
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every detail curated to elevate your experience and exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="group bg-card rounded-2xl p-8 shadow-[var(--shadow-soft)] card-hover border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {amenity.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                {amenity.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-secondary/30 rounded-2xl border border-border">
          <p className="text-foreground text-lg font-medium mb-2">
            Beach access • Premium toiletries • Workspace • BBQ grill • And more
          </p>
          <p className="text-muted-foreground">
            Everything thoughtfully provided for an unforgettable Hamptons experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;

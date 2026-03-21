
import React from 'react';
import { Home, Users, Trees, Waves, MapPin } from 'lucide-react';

const QuickDetails = () => {
  const details = [
    { icon: Home, label: 'Entire Private Home' },
    { icon: Users, label: 'Sleeps 6 Guests' },
    { icon: Trees, label: 'Large Outdoor Space' },
    { icon: Waves, label: 'Pool + Lounge Area' },
    { icon: MapPin, label: 'Minutes to EH Village' },
  ];

  return (
    <section className="py-6 bg-foreground">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {details.map((detail, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80">
              <detail.icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide">{detail.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickDetails;

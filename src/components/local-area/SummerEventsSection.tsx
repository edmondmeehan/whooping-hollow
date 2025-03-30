
import React from 'react';
import { Music, Palette, Film, Building } from 'lucide-react';

type SummerEventsSectionProps = {
  title: string;
  description: string;
  events: Array<{
    name: string;
    description: string;
    dates: string;
    activities: string;
  }>;
};

const SummerEventsSection: React.FC<SummerEventsSectionProps> = ({ 
  title, description, events 
}) => {
  // Map event names to icons
  const getEventIcon = (name: string) => {
    if (name.toLowerCase().includes('music')) return Music;
    if (name.toLowerCase().includes('art')) return Palette;
    if (name.toLowerCase().includes('film')) return Film;
    if (name.toLowerCase().includes('horse')) return Building;
    return Music; // Default icon
  };

  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Music className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          {title}
        </h2>
      </div>
      
      <p className="text-gray-600 mb-8 font-sans">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => {
          const EventIcon = getEventIcon(event.name);
          
          return (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <EventIcon className="text-coastal-600" size={24} />
                <h3 className="font-serif font-semibold text-xl text-hamptons-dark">
                  {event.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 font-sans">
                {event.description}
              </p>
              <div className="flex flex-col space-y-2 font-sans">
                <div className="flex items-start">
                  <span className="font-medium w-20">Dates:</span>
                  <span className="text-gray-600">{event.dates}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-20">Activities:</span>
                  <span className="text-gray-600">{event.activities}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-sm text-gray-500 italic font-sans">
        Please note that event dates and details may vary annually. We recommend checking the official event websites or local listings for the most up-to-date information.
      </div>
    </section>
  );
};

export default SummerEventsSection;

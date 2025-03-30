
import React from 'react';
import { MapPin } from 'lucide-react';

const InsiderTips = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          Insider Tips
        </h2>
      </div>
      
      <div className="bg-hamptons-light p-8 rounded-lg">
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-coastal-600 font-bold">•</span>
            <span>Avoid beach parking headaches by taking a local bike or shuttle.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coastal-600 font-bold">•</span>
            <span>East Hampton is bike-friendly and walkable — bring or rent bikes for a true Hamptons experience.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coastal-600 font-bold">•</span>
            <span>Visit off-season for quiet beauty, art events, and better availability.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coastal-600 font-bold">•</span>
            <span>Most restaurants and attractions are busiest from Thursday evening through Sunday during summer months—plan accordingly.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coastal-600 font-bold">•</span>
            <span>Early dinner reservations (before 7pm) are much easier to secure during peak season.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InsiderTips;

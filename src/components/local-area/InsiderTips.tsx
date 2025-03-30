
import React from 'react';
import { MapPin } from 'lucide-react';

type InsiderTipsProps = {
  title: string;
  tips: string[];
};

const InsiderTips: React.FC<InsiderTipsProps> = ({ title, tips }) => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          {title}
        </h2>
      </div>
      
      <div className="bg-hamptons-light p-8 rounded-lg">
        <ul className="space-y-4 text-gray-600 font-sans">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InsiderTips;

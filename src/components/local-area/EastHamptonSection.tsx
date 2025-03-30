
import React from 'react';
import { Waves } from 'lucide-react';

type EastHamptonSectionProps = {
  title: string;
  description: string;
  highlights: string[];
  imageUrl: string;
};

const EastHamptonSection: React.FC<EastHamptonSectionProps> = ({ 
  title, description, highlights, imageUrl 
}) => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Waves className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 mb-6 font-sans">
            {description}
          </p>
          
          <h3 className="font-serif font-semibold text-lg mb-3 text-hamptons-dark">Highlights:</h3>
          <ul className="space-y-3 text-gray-600 font-sans">
            {highlights.map((highlight, index) => {
              const parts = highlight.includes(':') 
                ? highlight.split(':', 2)
                : [null, highlight];
              
              return (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-coastal-600 font-bold">•</span>
                  <span>
                    {parts[0] ? (
                      <>
                        <span className="font-medium">{parts[0]}:</span> {parts[1]}
                      </>
                    ) : (
                      parts[1]
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={imageUrl} 
            alt="East Hampton Beach" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EastHamptonSection;

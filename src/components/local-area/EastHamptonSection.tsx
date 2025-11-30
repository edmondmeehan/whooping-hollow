
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
        <Waves className="text-primary" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-muted-foreground mb-6 font-sans leading-relaxed text-lg">
            {description}
          </p>
          
          <h3 className="font-serif font-semibold text-lg mb-4 text-foreground">Highlights:</h3>
          <ul className="space-y-3 text-muted-foreground font-sans">
            {highlights.map((highlight, index) => {
              const parts = highlight.includes(':') 
                ? highlight.split(':', 2)
                : [null, highlight];
              
              return (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl leading-none mt-1">•</span>
                  <span className="flex-1">
                    {parts[0] ? (
                      <>
                        <span className="font-semibold text-foreground">{parts[0]}:</span> {parts[1]}
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
        
        <div className="rounded-xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border group">
          <img 
            src={imageUrl} 
            alt="East Hampton Beach" 
            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default EastHamptonSection;

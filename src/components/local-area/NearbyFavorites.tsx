
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type NearbyFavoritesProps = {
  title: string;
  items: Array<{
    name: string;
    description: string;
    distance: string;
    imageUrl?: string;
  }>;
};

const NearbyFavorites: React.FC<NearbyFavoritesProps> = ({ title, items }) => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-primary" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden card-hover border-border shadow-[var(--shadow-soft)]">
            {item.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            )}
            <CardContent className="pt-6">
              <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-2 font-sans">{item.description}</p>
              <p className="text-muted-foreground/70 text-sm font-sans flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.distance}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NearbyFavorites;

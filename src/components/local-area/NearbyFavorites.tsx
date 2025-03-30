
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type NearbyFavoritesProps = {
  title: string;
  items: Array<{
    name: string;
    description: string;
    distance: string;
  }>;
};

const NearbyFavorites: React.FC<NearbyFavoritesProps> = ({ title, items }) => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <h3 className="font-serif font-semibold text-lg mb-2 text-hamptons-dark">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2 font-sans">{item.description}</p>
              <p className="text-gray-500 text-sm font-sans">{item.distance}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NearbyFavorites;

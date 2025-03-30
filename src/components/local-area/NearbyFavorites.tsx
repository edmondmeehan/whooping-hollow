
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NearbyFavorites = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          Nearby Favorites
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif font-semibold text-lg mb-2 text-hamptons-dark">Wölffer Estate Vineyard</h3>
            <p className="text-gray-600 text-sm mb-2">Wine tasting with a view</p>
            <p className="text-gray-500 text-sm">20 min drive</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif font-semibold text-lg mb-2 text-hamptons-dark">The Lobster Roll (LUNCH)</h3>
            <p className="text-gray-600 text-sm mb-2">Classic roadside seafood shack</p>
            <p className="text-gray-500 text-sm">15 min drive</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif font-semibold text-lg mb-2 text-hamptons-dark">Cavaniola's Gourmet</h3>
            <p className="text-gray-600 text-sm mb-2">For charcuterie lovers</p>
            <p className="text-gray-500 text-sm">15 min drive</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif font-semibold text-lg mb-2 text-hamptons-dark">Amber Waves Farm</h3>
            <p className="text-gray-600 text-sm mb-2">Organic produce, café, and flower picking</p>
            <p className="text-gray-500 text-sm">10 min drive</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NearbyFavorites;

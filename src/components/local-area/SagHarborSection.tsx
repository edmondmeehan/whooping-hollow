
import React from 'react';
import { Anchor } from 'lucide-react';

const SagHarborSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Anchor className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          Sag Harbor: Historic & Artsy Harbor Town
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&q=80" 
            alt="Sag Harbor Marina" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="order-1 md:order-2">
          <p className="text-gray-600 mb-6">
            Just a 15-minute drive away, Sag Harbor offers a more nautical, small-town vibe with deep literary and maritime roots.
          </p>
          
          <h3 className="font-serif font-semibold text-lg mb-3 text-hamptons-dark">Highlights:</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">History:</span> Explore the Sag Harbor Whaling & Historical Museum, or walk the historic Main Street filled with independent bookstores, cozy restaurants, and antique shops.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Marina:</span> Grab a coffee and stroll the marina — the perfect low-key day trip.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Dining:</span> Don't miss sunset drinks by the water at The American Hotel or Baron's Cove.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Arts Scene:</span> Catch an independent film or live performance at the Sag Harbor Cinema Arts Center.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SagHarborSection;

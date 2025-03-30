
import React from 'react';
import { Waves } from 'lucide-react';

const EastHamptonSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Waves className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          East Hampton: Coastal Elegance
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 mb-6">
            Known for its pristine beaches, historic homes, and celebrity hideaways, East Hampton is the perfect blend of 
            laid-back charm and upscale living.
          </p>
          
          <h3 className="font-serif font-semibold text-lg mb-3 text-hamptons-dark">Highlights:</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Beaches:</span> Spend the day at Main Beach, one of the most beautiful (and cleanest!) beaches on the East Coast.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Shopping & Dining:</span> Stroll through East Hampton Village for boutique shopping, local galleries, and charming cafes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Culture:</span> Catch a film at Guild Hall or check out art exhibits and live performances.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Dining:</span> The area is home to world-class restaurants, wineries, and scenic biking trails.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coastal-600 font-bold">•</span>
              <span><span className="font-medium">Celebrity Spotting:</span> Keep your eyes open — you just might spot a few familiar faces from the big screen.</span>
            </li>
          </ul>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?auto=format&fit=crop&q=80" 
            alt="East Hampton Beach" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EastHamptonSection;

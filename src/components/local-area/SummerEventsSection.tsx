
import React from 'react';
import { Music, Palette, Film, Building } from 'lucide-react';

const SummerEventsSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Music className="text-coastal-600" size={32} />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-hamptons-dark">
          Summer Events in East Hampton & Sag Harbor
        </h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        The summer season brings a plethora of events that showcase the vibrant community spirit of the Hamptons. Here are some highlights:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Music className="text-coastal-600" size={24} />
            <h3 className="font-serif font-semibold text-xl text-hamptons-dark">
              Sag Harbor American Music Festival
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            An annual celebration featuring a diverse range of musical performances across various venues in Sag Harbor.
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start">
              <span className="font-medium w-20">Dates:</span>
              <span className="text-gray-600">Typically held in late September</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium w-20">Activities:</span>
              <span className="text-gray-600">Enjoy live music spanning genres from jazz to folk, with both free and ticketed events</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="text-coastal-600" size={24} />
            <h3 className="font-serif font-semibold text-xl text-hamptons-dark">
              East Hampton Summer Art Show
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Hosted by the Artist Alliance of East Hampton, this exhibition showcases works from local artists.
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start">
              <span className="font-medium w-20">Dates:</span>
              <span className="text-gray-600">Usually takes place in late June to early July</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium w-20">Activities:</span>
              <span className="text-gray-600">Explore a variety of artworks, including paintings, sculptures, and photography</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Film className="text-coastal-600" size={24} />
            <h3 className="font-serif font-semibold text-xl text-hamptons-dark">
              Hamptons International Film Festival
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            A prestigious event featuring films from around the world, attracting filmmakers and enthusiasts alike.
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start">
              <span className="font-medium w-20">Dates:</span>
              <span className="text-gray-600">Occurs in October, marking the culmination of the summer season</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium w-20">Activities:</span>
              <span className="text-gray-600">Attend screenings, panel discussions, and special events with industry professionals</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Building className="text-coastal-600" size={24} />
            <h3 className="font-serif font-semibold text-xl text-hamptons-dark">
              Hampton Classic Horse Show
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            One of the largest outdoor horse shows in the U.S., showcasing top equestrian talent.
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start">
              <span className="font-medium w-20">Dates:</span>
              <span className="text-gray-600">Held annually during the week leading up to Labor Day</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium w-20">Activities:</span>
              <span className="text-gray-600">Witness world-class show jumping competitions, enjoy boutique shopping, and savor gourmet food options</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 italic">
        Please note that event dates and details may vary annually. We recommend checking the official event websites or local listings for the most up-to-date information.
      </div>
    </section>
  );
};

export default SummerEventsSection;

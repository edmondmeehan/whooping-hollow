
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Beach, Anchor, MapPin, Music, PaintBucket, Film, Horse } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LocalArea = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-hamptons-dark mb-4">
              Discover East Hampton & Sag Harbor
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the charm, beauty, and culture of the Hamptons' most beloved coastal communities.
            </p>
          </div>
          
          {/* East Hampton Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Beach className="text-coastal-600" size={32} />
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
          
          {/* Sag Harbor Section */}
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
          
          {/* Nearby Favorites */}
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
          
          {/* Summer Events */}
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
                  <PaintBucket className="text-coastal-600" size={24} />
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
                  <Horse className="text-coastal-600" size={24} />
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
          
          {/* Insider Tips */}
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LocalArea;

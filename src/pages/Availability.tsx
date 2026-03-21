import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Availability = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container-custom py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Availability Calendar
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check real-time availability and pricing for The Ranch Modern.
            </p>
          </div>
          
          <div className="w-full rounded-lg overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
            <iframe
              src="https://staymarquis.com/properties/the-ranch-modern"
              title="The Ranch Modern — Availability Calendar"
              className="w-full border-0"
              style={{ height: '800px' }}
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Want a special direct booking discount?
            </p>
            <a 
              href="/book-direct"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-[var(--shadow-soft)]"
            >
              Request Your Dates
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Availability;

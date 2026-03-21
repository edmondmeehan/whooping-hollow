import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OtherPropertiesBanner from '@/components/OtherPropertiesBanner';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

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
              View available dates for Whooping Hollow. Dates shown in gray are already booked.
            </p>
          </div>
          
          <AvailabilityCalendar />
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to book your Hamptons getaway?
            </p>
            <a 
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-[var(--shadow-soft)]"
            >
              Request Your Dates
            </a>
          </div>
        </div>
      </main>
      <OtherPropertiesBanner />
      <Footer />
    </div>
  );
};

export default Availability;

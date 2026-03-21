import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarCheck } from 'lucide-react';

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

          <div className="mt-8 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/80 transition-all duration-300 shadow-[var(--shadow-soft)]">
                  <CalendarCheck className="h-5 w-5" />
                  Check Dates on StayMarquis
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[90vw] h-[80vh] p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle>Check Availability on StayMarquis</DialogTitle>
                </DialogHeader>
                <iframe
                  src="https://staymarquis.com/properties/the-ranch-modern"
                  className="w-full flex-1 border-0"
                  style={{ height: 'calc(80vh - 60px)' }}
                  title="StayMarquis - The Ranch Modern"
                  allow="fullscreen"
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to book your Hamptons getaway?
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

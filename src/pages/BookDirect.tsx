
import React from 'react';
import Navbar from '../components/Navbar';
import StickyHeader from '../components/StickyHeader';
import Footer from '../components/Footer';
import BookingForm from '../components/booking/BookingForm';
import { Clock, CalendarDays, Tag, Shield } from 'lucide-react';

const BookDirect = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <Navbar />
      
      <div className="container-custom pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Check Availability & Book Your Stay
          </h1>
          
          {/* Trust copy */}
          <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book direct for the best rates and a seamless experience.
          </p>

          {/* Urgency line */}
          <div className="flex items-center justify-center gap-2 mb-10 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <CalendarDays className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-foreground font-medium text-sm">
              Upcoming weekends are booking quickly — secure your dates now.
            </p>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Minimum Stay</p>
                <p className="text-xs text-muted-foreground">2-night minimum</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
              <Tag className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Extended Stays</p>
                <p className="text-xs text-muted-foreground">Discounts available</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">No Hidden Fees</p>
                <p className="text-xs text-muted-foreground">Transparent pricing</p>
              </div>
            </div>
          </div>
          
          <BookingForm />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              We'll respond within 24 hours with availability and a custom quote. 
              Prefer to text? <a href="sms:+19166165376" className="text-primary hover:underline">Text us to book</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDirect;

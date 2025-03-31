
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/booking/BookingForm';
import NewsletterForm from '../components/newsletter/NewsletterForm';

const BookDirect = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container-custom pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-center mb-3">Direct Booking Request</h1>
          <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Request a discount by booking directly with the property owner.
            Fill out the form below and we'll get back to you with special pricing.
          </p>
          
          <BookingForm />
          
          <div className="mt-12 border-t pt-8">
            <NewsletterForm className="max-w-md mx-auto" />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By submitting this form, you'll receive a custom quote with a special direct booking discount.
              We'll contact you within 24 hours.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDirect;


import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-24 bg-coastal-700 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
          Ready for Your East Hampton Getaway?
        </h2>
        <p className="text-lg text-coastal-100 max-w-3xl mx-auto mb-10">
          Book your stay at Whooping Hollow and experience the perfect blend of luxury, comfort, and relaxation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button className="bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90 text-lg px-8 py-6">
            <Link 
              to="/book-direct"
              className="flex items-center"
            >
              Book Directly & Save
            </Link>
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
            <Link to="/properties" className="flex items-center">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

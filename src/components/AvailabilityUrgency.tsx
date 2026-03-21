
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AvailabilityUrgency = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
          <CalendarDays className="w-10 h-10 text-accent mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Upcoming Availability
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed">
            Summer dates are limited — book early to secure your stay.
          </p>
          
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider group" asChild>
            <Link to="/properties" className="flex items-center gap-2">
              Check Availability
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailabilityUrgency;

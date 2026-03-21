
import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">The Experience</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              This Is What a Hamptons Weekend Should Feel Like
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              No crowded lobbies. No noise. No compromises.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Just a private, beautifully designed home where you can unwind, host, and enjoy the Hamptons the way it was meant to be experienced.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're here for a summer weekend, a family getaway, or a quiet escape from the city — this is your space to reset.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

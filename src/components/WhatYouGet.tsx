
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatYouGet = () => {
  const items = [
    'Fully private home — no shared areas',
    'Spacious indoor and outdoor living',
    'Pool with lounge seating',
    'Outdoor dining and entertaining space',
    'Fully equipped kitchen',
    'Fast WiFi + smart TV',
    'Easy parking',
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Features</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Designed for Comfort, Space, and Ease
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;

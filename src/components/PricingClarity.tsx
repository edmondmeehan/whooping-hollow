
import React from 'react';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingClarity = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Pricing</span>
              <div className="h-px w-12 bg-accent" />
            </div>

            <DollarSign className="w-10 h-10 text-primary mx-auto mb-6" />

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              Simple, Transparent Pricing
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Weekend stays typically range from <span className="text-foreground font-semibold">$X–$X per night</span> depending on season.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Discounts available for longer stays.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Book direct for the best available rate.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingClarity;


import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">The Experience</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              The Weekend You Actually Want
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Arrive Friday and settle in without the chaos.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Spend your mornings slow, your afternoons by the pool, and your evenings outside with friends, family, and zero distractions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No crowded hotels. No shared spaces. Just your own private place to enjoy the Hamptons.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

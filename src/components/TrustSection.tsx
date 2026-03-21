
import React from 'react';
import { Shield, MessageSquare, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  const items = [
    { icon: MessageSquare, label: 'Direct communication with the owner' },
    { icon: Shield, label: 'Fast response times' },
    { icon: Lock, label: 'Secure booking process' },
    { icon: Star, label: 'Highly rated guest experience' },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Trust</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Book With Confidence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-medium text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

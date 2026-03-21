
import React from 'react';
import { Waves, BedDouble, Bath, Umbrella, Wind as HairDryer, Shirt, WashingMachine, Wind, Snowflake, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const amenities = [
    { icon: Waves, name: 'Private Pool', description: 'Heated saltwater pool for your exclusive use' },
    { icon: BedDouble, name: 'Bed Linens', description: 'Premium quality linens on all beds' },
    { icon: Bath, name: 'Bath Towels', description: 'Plush bath towels provided for all guests' },
    { icon: Umbrella, name: 'Pool/Beach Towels', description: 'Towels for the pool and nearby beaches' },
    { icon: HairDryer, name: 'Hair Dryer', description: 'Available in each bathroom' },
    { icon: Shirt, name: 'Iron/Ironing Board', description: 'Keep your wardrobe crisp and fresh' },
    { icon: WashingMachine, name: 'Washer & Dryer', description: 'Full-size in-unit laundry machines' },
    { icon: Snowflake, name: 'Air Conditioning', description: 'Central air conditioning throughout' },
    { icon: Flame, name: 'Heating', description: 'Full heating system for cooler months' },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Amenities</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Designed for Comfort
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every detail curated to elevate your experience and exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-card rounded-2xl p-7 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <amenity.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                {amenity.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            Fire pit • Gas BBQ • Outdoor dining • Contemporary design
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;

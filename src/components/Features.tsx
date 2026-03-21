
import React from 'react';
import { Wifi, Sparkles, Utensils, Waves, Wind, Home, Users, Wine } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const amenities = [
    { icon: Sparkles, name: 'Concierge Service', description: 'Personalized assistance for reservations and experiences' },
    { icon: Waves, name: 'Heated Pool & Hot Tub', description: 'Private saltwater pool with spa overlooking gardens' },
    { icon: Utensils, name: "Chef's Kitchen", description: 'Gourmet kitchen with premium appliances' },
    { icon: Wind, name: 'Outdoor Living', description: 'Expansive terraces with lounge and dining areas' },
    { icon: Wifi, name: 'High-Speed WiFi', description: 'Fiber optic internet throughout the property' },
    { icon: Home, name: 'Luxury Linens', description: 'Premium bedding and plush towels' },
    { icon: Users, name: 'Entertainment Space', description: 'Media room with state-of-the-art sound system' },
    { icon: Wine, name: 'Wine Cellar', description: 'Temperature-controlled storage for your collection' },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            Beach access • Premium toiletries • Workspace • BBQ grill • And much more
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

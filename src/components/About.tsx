
import React from 'react';
import { MapPin, Users, Home, Star } from 'lucide-react';
import { useProperties } from '../hooks/use-properties';
import { motion } from 'framer-motion';

const About = () => {
  const { propertiesData } = useProperties();
  const { featured } = propertiesData;

  const stats = [
    { icon: MapPin, label: 'Prime Location', value: 'East Hampton, NY' },
    { icon: Users, label: 'Sleeps 8', value: 'Comfortably' },
    { icon: Home, label: '4 Bedrooms', value: 'Luxury suites' },
    { icon: Star, label: '5-Star Rated', value: 'Exceptional stays' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src={featured.image} 
                alt={featured.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a known working image
                  (e.target as HTMLImageElement).src = 'https://cpryayfndzfeyfrnsesr.supabase.co/storage/v1/object/public/images/public/80bbb436-d90a-40ad-b9e2-7c4f25bd56dc.jpg';
                }}
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white">
                  <div className="bg-green-400 rounded-full w-2.5 h-2.5 animate-pulse" />
                  <span className="text-sm font-medium uppercase tracking-wider">Available for booking</span>
                </div>
              </div>
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-2xl hidden lg:block">
              <p className="text-3xl font-serif font-bold">5★</p>
              <p className="text-xs uppercase tracking-wider font-medium mt-1">Guest Rating</p>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">About the Property</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              {featured.name}
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Immerse yourself in unparalleled luxury at our meticulously curated East Hampton estate. 
              This architectural gem seamlessly blends contemporary elegance with coastal sophistication.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Perfectly positioned between East Hampton Village and Sag Harbor—each just 5 minutes away—
              enjoy effortless access to world-class dining, pristine beaches, and boutique shopping.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="group p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-[var(--shadow-soft)] transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-primary mb-3" />
                  <p className="font-semibold text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

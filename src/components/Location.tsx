
import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      
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
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Location</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            
            <MapPin className="w-10 h-10 text-primary mx-auto mb-6" />
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              Close to Everything, Away from the Noise
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Located in East Hampton, you're just minutes from the village, beaches, restaurants, and everything that makes the Hamptons special — while still enjoying total privacy when you want to unwind.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;


import React from 'react';
import { Calendar, Users, Palmtree, Briefcase, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PerfectFor = () => {
  const uses = [
    { icon: Calendar, label: 'Weekend getaways from NYC' },
    { icon: Users, label: 'Families who need real space' },
    { icon: Heart, label: 'Small group trips' },
    { icon: Palmtree, label: 'Summer escapes' },
    { icon: Briefcase, label: 'Work-from-anywhere weeks' },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Ideal For</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Perfect For
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {uses.map((use, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-border hover:border-accent/40 transition-all duration-300"
            >
              <use.icon className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium text-sm">{use.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerfectFor;

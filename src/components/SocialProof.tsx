
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  const reviews = [
    {
      text: "Perfect for a weekend escape from NYC — felt like our own private resort.",
      author: "Recent Guest",
    },
    {
      text: "Way better than staying at a hotel. Tons of space and super relaxing.",
      author: "Recent Guest",
    },
    {
      text: "We didn't want to leave. Already planning our next stay.",
      author: "Recent Guest",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Reviews</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Guests Love It Here
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-card rounded-2xl p-8 border border-border"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <p className="text-foreground text-lg leading-relaxed mb-6 font-serif italic">
                "{review.text}"
              </p>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

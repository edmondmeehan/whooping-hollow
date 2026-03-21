
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const TextCTA = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <MessageCircle className="w-10 h-10 text-primary mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Have Questions or Want to Book Fast?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Text us directly for availability, pricing, and quick answers.
          </p>
          
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-10 py-7 shadow-xl hover:scale-105 transition-all duration-300 uppercase tracking-wider" asChild>
            <a href="sms:+19166165376">Text (916) 616-5376</a>
          </Button>
          
          <p className="mt-4 text-muted-foreground text-sm">
            We typically respond within minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextCTA;

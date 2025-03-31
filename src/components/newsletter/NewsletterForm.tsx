
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NewsletterFormProps {
  variant?: 'default' | 'inline';
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store subscriber in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('whh_newsletter_subscribers') || '[]');
      
      // Check if already subscribed
      if (subscribers.includes(email)) {
        toast.info('You are already subscribed to our newsletter');
        setIsSubmitting(false);
        return;
      }
      
      // Add to subscribers
      subscribers.push(email);
      localStorage.setItem('whh_newsletter_subscribers', JSON.stringify(subscribers));
      
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-sm"
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="space-y-1">
        <h4 className="font-medium text-sm">Subscribe to our newsletter</h4>
        <p className="text-sm text-muted-foreground">
          Get updates on special offers and local events.
        </p>
      </div>
      <div className="space-y-3">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;

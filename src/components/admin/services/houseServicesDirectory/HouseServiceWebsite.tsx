
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HouseServiceWebsiteProps {
  website?: string;
}

const HouseServiceWebsite: React.FC<HouseServiceWebsiteProps> = ({ website }) => {
  if (!website) return null;
  
  return (
    <a 
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="text-hamptons-accent hover:underline flex items-center"
    >
      <Button size="sm" variant="outline" className="h-8">
        <span className="mr-1">Visit</span>
        <ExternalLink className="h-3 w-3" />
      </Button>
    </a>
  );
};

export default HouseServiceWebsite;

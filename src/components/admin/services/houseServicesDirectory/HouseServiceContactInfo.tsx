
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HouseServiceContactInfoProps {
  phone?: string;
  email?: string;
}

const HouseServiceContactInfo: React.FC<HouseServiceContactInfoProps> = ({ phone, email }) => {
  return (
    <div className="flex space-x-2">
      {phone && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = `tel:${phone}`}
                className="h-8 w-8 p-0"
              >
                <Phone className="h-4 w-4 text-hamptons-accent" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{phone}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {email && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = `mailto:${email}`}
                className="h-8 w-8 p-0"
              >
                <Mail className="h-4 w-4 text-hamptons-accent" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default HouseServiceContactInfo;

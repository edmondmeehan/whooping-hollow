
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HouseServiceNotesProps {
  notes?: string;
}

const HouseServiceNotes: React.FC<HouseServiceNotesProps> = ({ notes }) => {
  if (!notes) return <span>—</span>;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <FileText className="h-3 w-3 mr-1" />
            View Notes
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{notes}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HouseServiceNotes;

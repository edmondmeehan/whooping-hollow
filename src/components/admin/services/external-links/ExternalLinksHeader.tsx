
import React from 'react';
import { ExternalLink, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExternalLinksHeaderProps {
  onAddLink: () => void;
  onRefresh: () => void;
  isAddingOrEditing: boolean;
  isMobile?: boolean;
}

const ExternalLinksHeader: React.FC<ExternalLinksHeaderProps> = ({ 
  onAddLink, 
  onRefresh, 
  isAddingOrEditing,
  isMobile = false
}) => {
  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex items-center">
        <ExternalLink className="mr-2 h-5 w-5 text-hamptons-accent" />
        <div>
          <h3 className="text-lg font-medium">External Service Links</h3>
          <p className="text-sm text-muted-foreground">
            {isMobile ? "Links to key services" : "Links to important external services and websites"}
          </p>
        </div>
      </div>
      <div className={`flex ${isMobile ? "justify-between" : ""} space-x-2`}>
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
        >
          <RefreshCw className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
          {isMobile ? "Sync" : "Refresh"}
        </Button>
        <Button 
          onClick={onAddLink} 
          disabled={isAddingOrEditing}
          size={isMobile ? "sm" : "default"}
        >
          <Plus className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
          {isMobile ? "Add" : "Add Link"}
        </Button>
      </div>
    </div>
  );
};

export default ExternalLinksHeader;

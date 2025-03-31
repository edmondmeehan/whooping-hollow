
import React from 'react';
import { ExternalLink, Plus, RefreshCw } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExternalLinksHeaderProps {
  onAddLink: () => void;
  onRefresh: () => void;
  isAddingOrEditing: boolean;
}

const ExternalLinksHeader: React.FC<ExternalLinksHeaderProps> = ({
  onAddLink,
  onRefresh,
  isAddingOrEditing
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="flex items-center">
          <ExternalLink className="mr-2 h-5 w-5 text-hamptons-accent" />
          External Service Links
        </CardTitle>
        <CardDescription>
          Quick access to important external services
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={onAddLink} disabled={isAddingOrEditing}>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>
    </div>
  );
};

export default ExternalLinksHeader;

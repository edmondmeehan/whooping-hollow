
import React from 'react';
import { Link, Plus, RefreshCw } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HouseServicesHeaderProps {
  onAddService: () => void;
  onRefresh: () => void;
  isAddingOrEditing: boolean;
}

const HouseServicesHeader: React.FC<HouseServicesHeaderProps> = ({
  onAddService,
  onRefresh,
  isAddingOrEditing
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="flex items-center">
          <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
          House Services Directory
        </CardTitle>
        <CardDescription>
          Complete information about all house services and contacts
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button 
          onClick={onAddService} 
          disabled={isAddingOrEditing}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>
    </div>
  );
};

export default HouseServicesHeader;

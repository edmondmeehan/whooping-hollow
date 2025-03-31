
import React from 'react';
import { Link } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';

const HouseServicesHeader: React.FC = () => {
  return (
    <>
      <CardTitle className="flex items-center text-hamptons-dark">
        <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
        House Services Directory
      </CardTitle>
      <CardDescription className="text-muted-foreground">
        Complete information about all house services and contacts
      </CardDescription>
    </>
  );
};

export default HouseServicesHeader;

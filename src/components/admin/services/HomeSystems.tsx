
import React from 'react';
import { HomeIcon, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditableHomeSystemsTable from './EditableHomeSystemsTable';
import SecurityNotice from './SecurityNotice';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/admin/use-properties';
import PropertySelector from './PropertySelector';

interface HomeSystemsProps {
  property?: string;
}

const HomeSystems: React.FC<HomeSystemsProps> = ({ property }) => {
  // Only use the property selector internally if not receiving a property from props
  const { properties, selectedProperty, selectProperty } = useProperties();
  const effectiveProperty = property || selectedProperty;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <HomeIcon className="mr-2 h-5 w-5 text-hamptons-accent" />
                Home Systems & Apps
              </CardTitle>
              <CardDescription>
                Access codes and information for home systems
              </CardDescription>
            </div>
            <Button onClick={() => {}} variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
          {!property && (
            <PropertySelector 
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertyChange={selectProperty}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <EditableHomeSystemsTable property={effectiveProperty} />
        <SecurityNotice />
      </CardContent>
    </Card>
  );
};

export default HomeSystems;

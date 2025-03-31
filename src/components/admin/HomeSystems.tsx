
import React from 'react';
import { Key, HomeIcon, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const HomeSystems = () => {
  const homeSystemsData = [
    {
      system: 'Internet',
      access: 'Mister / internet1',
      notes: ''
    },
    {
      system: 'Front Door Lock',
      access: 'Assigned to each user',
      notes: ''
    },
    {
      system: 'Back Door Lock',
      access: '9174 + Kwikset button',
      notes: ''
    },
    {
      system: 'Garage Lock',
      access: '3305#',
      notes: ''
    },
    {
      system: 'Owners Closet Lock',
      access: '1231',
      notes: ''
    },
    {
      system: 'Hydrawise Sprinklers',
      access: 'Contact Brookhaven Irrigation for app access',
      notes: ''
    },
    {
      system: 'Hunter Irrigation Clock',
      access: 'Serial # 05FD1D61',
      notes: ''
    },
    {
      system: 'Pentair Screen Logic Pool Heater',
      access: 'Pentair: 07-AE-75 / blank password',
      notes: 'Connect via local connection while on location, connect via remote connection while away; ask JW Poolcare for assistance'
    },
    {
      system: 'TV',
      access: '',
      notes: 'Use Gmatrix remote to power on the TV (wait 10 seconds); use Roku remote to control channels'
    },
    {
      system: 'Music',
      access: '',
      notes: 'Use unbranded remote to connect music to the sound bar speaker; connect via Bluetooth to Amazonbasics08'
    },
    {
      system: 'Alarm (Vendors)',
      access: '9129',
      notes: ''
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HomeIcon className="mr-2 h-5 w-5 text-hamptons-accent" />
          Home Systems & Apps
        </CardTitle>
        <CardDescription>
          Access codes and information for home systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>System</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {homeSystemsData.map((system, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{system.system}</TableCell>
                  <TableCell>
                    {system.access && (
                      <div className="flex items-center">
                        {system.system.toLowerCase().includes('lock') && (
                          <Key className="mr-2 h-4 w-4 text-gray-500" />
                        )}
                        <span>{system.access}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-normal text-sm">{system.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center p-2 bg-amber-50 rounded-md border border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
          <p className="text-sm text-amber-700">
            Keep system access codes confidential and only share with authorized individuals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSystems;

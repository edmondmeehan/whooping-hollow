
import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import HomeSystems from './HomeSystems';

const ServiceLinks = () => {
  const externalServices = [
    {
      name: 'SimpliSafe',
      url: 'https://simplisafe.com',
      description: 'Home security system'
    },
    {
      name: 'Schlage',
      url: 'https://www.schlage.com',
      description: 'Smart locks management'
    },
    {
      name: 'Wyze',
      url: 'https://www.wyze.com',
      description: 'Camera system'
    }
  ];

  const houseServices = [
    {
      service: 'Electric',
      company: 'PSE&G',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: 'Account: 9934378844'
    },
    {
      service: 'Gas',
      company: 'National Grid',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: '78934-42199'
    },
    {
      service: 'Internet',
      company: 'Optimum',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: 'Account 07816-018984-16-7 / eddiemeehan / Brickhouse5150'
    },
    {
      service: 'Garbage',
      company: 'Maggio Environmental',
      status: 'Updated',
      contactName: '',
      phone: '631-696-6300',
      email: '',
      notes: 'Trash day is Wednesday'
    },
    {
      service: 'Pool',
      company: 'JW Poolcare',
      status: 'Active',
      contactName: 'JoAnn Whitmer',
      phone: '631-553-9919',
      email: 'jwpoolcare@aol.com',
      notes: ''
    },
    {
      service: 'Landscaping',
      company: 'Perfect World Landscaping',
      status: 'Active',
      contactName: 'Luis Uzcha',
      phone: '‭+1 (631) 284-7601‬',
      email: 'luisuzhca@hotmail.com',
      notes: ''
    },
    {
      service: 'Irrigation / Sprinklers',
      company: 'Brookhaven Irrigation',
      status: 'Active',
      contactName: 'Mike Coggins',
      phone: '631-430-4324',
      email: 'birrigation64@yahoo.com',
      notes: 'Shutoff needs to be scheduled, contact them to take control of app, module in garage'
    },
    {
      service: 'Generator',
      company: 'Gen Ready',
      status: 'Active',
      contactName: 'Allison Steedle',
      phone: '',
      email: 'allison@getgenready.com',
      notes: 'Contact them to take control of generator app'
    },
    {
      service: 'Handyperson',
      company: 'Prestine Management',
      status: 'Active',
      contactName: 'John Sebastian Ramirez',
      phone: '631-605-0294',
      email: 'prestinemanagement631@gmail.com',
      notes: ''
    },
    {
      service: 'Cleaning',
      company: 'Sisters Cleaning',
      status: 'Active',
      contactName: 'Isabel Acevedo',
      phone: '631-833-7932',
      email: 'isabelacevedop@gmail.com',
      notes: ''
    },
    {
      service: 'Pest control',
      company: 'East End Pest Management',
      status: 'Active',
      contactName: '',
      phone: '631-771-3145',
      email: '',
      notes: ''
    },
    {
      service: 'Property management',
      company: 'Stay Marquis',
      status: 'Inactive',
      contactName: '',
      phone: '631-301-2960',
      email: 'maintenance@staymarquis.com',
      notes: ''
    },
    {
      service: 'Painter',
      company: 'Aquiles Brito',
      status: 'Active',
      contactName: 'Inactive',
      phone: '917-209-0403',
      email: 'abrito@optonline.net',
      notes: ''
    },
    {
      service: 'Rental License',
      company: 'East Hampton Town',
      status: 'Active',
      contactName: '',
      phone: '',
      email: 'rentalregistry@ehamptonny.gov',
      notes: 'If you plan to rent the house out make sure to renew this to remain in compliance with the town'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
            External Service Links
          </CardTitle>
          <CardDescription>
            Quick access to important external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {externalServices.map((service) => (
              <a 
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="mr-3">
                  <ExternalLink className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-gray-500">{service.description}</div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <HomeSystems />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
            House Services Directory
          </CardTitle>
          <CardDescription>
            Complete information about all house services and contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {houseServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>{service.company}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        service.status === 'Updated' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </TableCell>
                    <TableCell>{service.contactName}</TableCell>
                    <TableCell>{service.phone}</TableCell>
                    <TableCell>
                      {service.email && (
                        <a 
                          href={`mailto:${service.email}`}
                          className="text-hamptons-accent hover:underline"
                        >
                          {service.email}
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-normal text-sm">{service.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceLinks;

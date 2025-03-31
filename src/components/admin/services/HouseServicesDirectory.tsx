
import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const HouseServicesDirectory = () => {
  const houseServices = [
    {
      service: 'Electric',
      company: 'PSE&G',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: 'Account: 9934378844',
      website: 'https://www.pseg.com'
    },
    {
      service: 'Gas',
      company: 'National Grid',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: '78934-42199',
      website: 'https://www.nationalgridus.com'
    },
    {
      service: 'Internet',
      company: 'Optimum',
      status: 'Updated',
      contactName: '',
      phone: '',
      email: '',
      notes: 'Account 07816-018984-16-7 / eddiemeehan / Brickhouse5150',
      website: 'https://www.optimum.com'
    },
    {
      service: 'Garbage',
      company: 'Maggio Environmental',
      status: 'Updated',
      contactName: '',
      phone: '631-696-6300',
      email: '',
      notes: 'Trash day is Wednesday',
      website: 'https://maggioenvironmental.com'
    },
    {
      service: 'Pool',
      company: 'JW Poolcare',
      status: 'Active',
      contactName: 'JoAnn Whitmer',
      phone: '631-553-9919',
      email: 'jwpoolcare@aol.com',
      notes: '',
      website: ''
    },
    {
      service: 'Landscaping',
      company: 'Perfect World Landscaping',
      status: 'Active',
      contactName: 'Luis Uzcha',
      phone: '‭+1 (631) 284-7601‬',
      email: 'luisuzhca@hotmail.com',
      notes: '',
      website: ''
    },
    {
      service: 'Irrigation / Sprinklers',
      company: 'Brookhaven Irrigation',
      status: 'Active',
      contactName: 'Mike Coggins',
      phone: '631-430-4324',
      email: 'birrigation64@yahoo.com',
      notes: 'Shutoff needs to be scheduled, contact them to take control of app, module in garage',
      website: ''
    },
    {
      service: 'Generator',
      company: 'Gen Ready',
      status: 'Active',
      contactName: 'Allison Steedle',
      phone: '',
      email: 'allison@getgenready.com',
      notes: 'Contact them to take control of generator app',
      website: 'https://getgenready.com'
    },
    {
      service: 'Handyperson',
      company: 'Prestine Management',
      status: 'Active',
      contactName: 'John Sebastian Ramirez',
      phone: '631-605-0294',
      email: 'prestinemanagement631@gmail.com',
      notes: '',
      website: ''
    },
    {
      service: 'Cleaning',
      company: 'Sisters Cleaning',
      status: 'Active',
      contactName: 'Isabel Acevedo',
      phone: '631-833-7932',
      email: 'isabelacevedop@gmail.com',
      notes: '',
      website: ''
    },
    {
      service: 'Pest control',
      company: 'East End Pest Management',
      status: 'Active',
      contactName: '',
      phone: '631-771-3145',
      email: '',
      notes: '',
      website: 'https://eastendpestmanagement.com'
    },
    {
      service: 'Property management',
      company: 'Stay Marquis',
      status: 'Inactive',
      contactName: '',
      phone: '631-301-2960',
      email: 'maintenance@staymarquis.com',
      notes: '',
      website: 'https://staymarquis.com'
    },
    {
      service: 'Painter',
      company: 'Aquiles Brito',
      status: 'Active',
      contactName: 'Inactive',
      phone: '917-209-0403',
      email: 'abrito@optonline.net',
      notes: '',
      website: ''
    },
    {
      service: 'Rental License',
      company: 'East Hampton Town',
      status: 'Active',
      contactName: '',
      phone: '',
      email: 'rentalregistry@ehamptonny.gov',
      notes: 'If you plan to rent the house out make sure to renew this to remain in compliance with the town',
      website: 'https://ehamptonny.gov/313/Rental-Registry-Program'
    }
  ];

  return (
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
                <TableHead>Website</TableHead>
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
                  <TableCell>
                    {service.website && (
                      <a 
                        href={service.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hamptons-accent hover:underline flex items-center"
                      >
                        <span className="mr-1">Visit</span>
                        <ExternalLink className="h-3 w-3" />
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
  );
};

export default HouseServicesDirectory;


import React from 'react';
import { Link, ExternalLink, Phone, Mail, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  // Sort services by status: Updated first, then Active, then Inactive
  const sortedServices = [...houseServices].sort((a, b) => {
    const statusOrder = { 'Updated': 1, 'Active': 2, 'Inactive': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <Card className="shadow-md border-none">
      <CardHeader className="bg-hamptons-light pb-2">
        <CardTitle className="flex items-center text-hamptons-dark">
          <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
          House Services Directory
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Complete information about all house services and contacts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Service</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedServices.map((service, index) => (
                <TableRow 
                  key={index} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}
                >
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
                  <TableCell>{service.contactName || '—'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {service.phone && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => window.location.href = `tel:${service.phone}`}
                                className="h-8 w-8 p-0"
                              >
                                <Phone className="h-4 w-4 text-hamptons-accent" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{service.phone}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
                      {service.email && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => window.location.href = `mailto:${service.email}`}
                                className="h-8 w-8 p-0"
                              >
                                <Mail className="h-4 w-4 text-hamptons-accent" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{service.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {service.notes ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              View Notes
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{service.notes}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    {service.website && (
                      <a 
                        href={service.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hamptons-accent hover:underline flex items-center"
                      >
                        <Button size="sm" variant="outline" className="h-8">
                          <span className="mr-1">Visit</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </TableCell>
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

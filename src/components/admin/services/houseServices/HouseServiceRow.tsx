
import React from 'react';
import { Edit, Trash2, Save, X, Link } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HouseService } from '@/services/admin/house-services-service';
import HouseServiceStatusBadge from '../houseServicesDirectory/HouseServiceStatusBadge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface HouseServiceRowProps {
  service: HouseService;
  editingId: string | null;
  form: HouseService;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onEdit: (service: HouseService) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isMobile: boolean;
}

const HouseServiceRow: React.FC<HouseServiceRowProps> = ({
  service,
  editingId,
  form,
  onInputChange,
  onStatusChange,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isMobile
}) => {
  const isEditing = editingId === service.id;

  if (isEditing) {
    return (
      <TableRow key={service.id}>
        <TableCell>
          <Input 
            name="service" 
            value={form.service} 
            onChange={onInputChange} 
          />
        </TableCell>
        <TableCell>
          <Input 
            name="company" 
            value={form.company} 
            onChange={onInputChange} 
          />
        </TableCell>
        <TableCell>
          <Select
            value={form.status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Updated">Updated</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Input 
            name="contact_name" 
            value={form.contact_name || ''} 
            onChange={onInputChange} 
          />
        </TableCell>
        {!isMobile && (
          <>
            <TableCell>
              <Input 
                name="phone" 
                value={form.phone || ''} 
                onChange={onInputChange} 
              />
            </TableCell>
            <TableCell>
              <Input 
                name="email" 
                value={form.email || ''} 
                onChange={onInputChange} 
              />
            </TableCell>
            <TableCell>
              <Input 
                name="website" 
                value={form.website || ''} 
                onChange={onInputChange} 
                placeholder="https://example.com"
              />
            </TableCell>
          </>
        )}
        <TableCell>
          <Textarea 
            name="notes" 
            value={form.notes || ''} 
            onChange={onInputChange} 
            className="min-h-[80px]"
          />
        </TableCell>
        <TableCell>
          <div className="flex space-x-1 justify-end">
            <Button size="sm" onClick={onSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (isMobile) {
    return (
      <TableRow key={service.id}>
        <TableCell className="font-medium">{service.service}</TableCell>
        <TableCell>{service.company}</TableCell>
        <TableCell>
          <HouseServiceStatusBadge status={service.status} />
        </TableCell>
        <TableCell>{service.contact_name}</TableCell>
        <TableCell className="max-w-[150px] whitespace-normal text-sm">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs py-1">Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-xs">
                  {service.phone && (
                    <div>
                      <span className="font-medium">Phone:</span> {service.phone}
                    </div>
                  )}
                  {service.email && (
                    <div>
                      <span className="font-medium">Email:</span>{' '}
                      <a href={`mailto:${service.email}`} className="text-hamptons-accent hover:underline">{service.email}</a>
                    </div>
                  )}
                  {service.website && (
                    <div>
                      <span className="font-medium">Website:</span>{' '}
                      <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-hamptons-accent hover:underline flex items-center">
                        <Link className="h-3 w-3 mr-1" />Visit
                      </a>
                    </div>
                  )}
                  {service.notes && (
                    <div>
                      <span className="font-medium">Notes:</span> {service.notes}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TableCell>
        <TableCell>
          <div className="flex space-x-1 justify-end">
            <Button size="sm" variant="ghost" onClick={() => onEdit(service)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(service.id!)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={service.id}>
      <TableCell className="font-medium">{service.service}</TableCell>
      <TableCell>{service.company}</TableCell>
      <TableCell>
        <HouseServiceStatusBadge status={service.status} />
      </TableCell>
      <TableCell>{service.contact_name}</TableCell>
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
            className="flex items-center text-hamptons-accent hover:underline"
          >
            <Link className="h-4 w-4 mr-1" />
            Visit
          </a>
        )}
      </TableCell>
      <TableCell className="max-w-xs whitespace-normal text-sm">{service.notes}</TableCell>
      <TableCell>
        <div className="flex space-x-1 justify-end">
          <Button size="sm" variant="ghost" onClick={() => onEdit(service)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(service.id!)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default HouseServiceRow;


import React from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HouseService } from '@/services/admin/house-services-service';

interface HouseServiceFormProps {
  form: HouseService;
  isAdding: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const HouseServiceForm: React.FC<HouseServiceFormProps> = ({
  form,
  isAdding,
  onInputChange,
  onStatusChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="mb-4 p-4 border rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <Input 
            name="service" 
            value={form.service} 
            onChange={onInputChange} 
            placeholder="Service type"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <Input 
            name="company" 
            value={form.company} 
            onChange={onInputChange} 
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            value={form.status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Updated">Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Name</label>
          <Input 
            name="contact_name" 
            value={form.contact_name || ''} 
            onChange={onInputChange} 
            placeholder="Contact person"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input 
            name="phone" 
            value={form.phone || ''} 
            onChange={onInputChange} 
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            name="email" 
            value={form.email || ''} 
            onChange={onInputChange} 
            placeholder="Email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input 
            name="website" 
            value={form.website || ''} 
            onChange={onInputChange} 
            placeholder="Website URL"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <Textarea 
            name="notes" 
            value={form.notes || ''} 
            onChange={onInputChange} 
            placeholder="Additional notes"
            className="min-h-[80px]"
          />
        </div>
        <div className="md:col-span-2 flex space-x-2 mt-2">
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" /> {isAdding ? 'Save' : 'Update'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseServiceForm;

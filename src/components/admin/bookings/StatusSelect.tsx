
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { BookingStatus } from '@/types/booking';

interface StatusSelectProps {
  currentStatus: BookingStatus;
  bookingId: number;
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ 
  currentStatus, 
  bookingId, 
  onStatusChange 
}) => {
  return (
    <Select 
      defaultValue={currentStatus}
      onValueChange={(value) => onStatusChange(bookingId, value as BookingStatus)}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;

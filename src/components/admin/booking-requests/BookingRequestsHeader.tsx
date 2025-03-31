
import React from 'react';
import { BookingRequestStatus } from '@/hooks/use-booking-requests';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import StatusFilter from './StatusFilter';

interface BookingRequestsHeaderProps {
  statusFilter: BookingRequestStatus;
  setStatusFilter: (value: BookingRequestStatus) => void;
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
}

const BookingRequestsHeader: React.FC<BookingRequestsHeaderProps> = ({
  statusFilter,
  setStatusFilter,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 className="text-2xl font-semibold">Direct Booking Requests</h2>
      
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
        <StatusFilter 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
        
        <Button 
          variant="outline" 
          onClick={onRefresh} 
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingRequestsHeader;

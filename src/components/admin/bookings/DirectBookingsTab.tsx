
import React, { useState } from 'react';
import { useBookingRequests } from '@/hooks/use-booking-requests';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminBookingRequests from '../AdminBookingRequests';

const DirectBookingsTab = () => {
  const {
    bookingRequests,
    isLoading,
    refreshBookingRequests,
  } = useBookingRequests();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefreshRequests = async () => {
    setIsRefreshing(true);
    await refreshBookingRequests();
    setIsRefreshing(false);
    toast.success('Booking requests refreshed');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={handleRefreshRequests} 
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
                Refresh Requests
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {isLoading ? (
          <div className="text-center py-10">
            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            <p className="mt-2 text-muted-foreground">Loading booking requests...</p>
          </div>
        ) : (
          <div className="p-2">
            {bookingRequests.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No direct booking requests found</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-2">
                Showing {bookingRequests.length} direct booking requests. Confirmed requests are automatically added to the Calendar.
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Show the booking requests using the existing AdminBookingRequests component */}
      <AdminBookingRequests />
    </>
  );
};

export default DirectBookingsTab;

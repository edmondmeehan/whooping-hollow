
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingTable from './bookings/BookingTable';
import { useBookings } from '@/hooks/use-bookings';
import { useBookingRequests } from '@/hooks/use-booking-requests';
import BookingDetailsModal from './bookings/BookingDetailsModal';
import BookingCreateModal from './bookings/BookingCreateModal';
import { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarRange, RefreshCw, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AdminBookings = () => {
  const [selectedTab, setSelectedTab] = useState<'calendar' | 'direct-bookings'>('calendar');
  // Calendar tab state
  const { 
    bookings, 
    statusFilter, 
    handleStatusChange, 
    updateStatusFilter, 
    addBooking, 
    deleteBooking 
  } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'booking' | 'block'>('booking');
  
  // Direct Bookings tab state
  const {
    bookingRequests,
    isLoading: isLoadingRequests,
    refreshBookingRequests,
  } = useBookingRequests();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Import direct bookings into calendar
  useEffect(() => {
    if (bookingRequests.length > 0) {
      // Convert confirmed booking requests to calendar bookings if they don't exist yet
      const confirmedRequests = bookingRequests.filter(req => 
        req.status === 'confirmed' && 
        !bookings.some(b => 
          b.email === req.email && 
          b.checkIn === req.check_in && 
          b.checkOut === req.check_out
        )
      );
      
      // Add each confirmed request to the bookings
      confirmedRequests.forEach(request => {
        addBooking({
          name: `${request.first_name} ${request.last_name}`,
          email: request.email,
          phone: request.phone,
          checkIn: request.check_in,
          checkOut: request.check_out,
          adults: request.adults,
          children: request.children || 0,
          status: 'confirmed' as BookingStatus,
          message: request.special_requests || '',
          notes: `Booking imported from direct booking request (ID: ${request.id})`,
          isBlockedDate: false
        });
      });
    }
  }, [bookingRequests, bookings, addBooking]);
  
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };
  
  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const handleOpenCreateModal = (mode: 'booking' | 'block') => {
    setCreateMode(mode);
    setIsCreateModalOpen(true);
  };
  
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  const handleCreateBooking = (newBooking: Omit<Booking, 'id' | 'created_at'>) => {
    addBooking(newBooking);
    setIsCreateModalOpen(false);
  };

  const handleDeleteBooking = (bookingId: number) => {
    deleteBooking(bookingId);
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(null);
    }
  };

  const handleRefreshRequests = async () => {
    setIsRefreshing(true);
    await refreshBookingRequests();
    setIsRefreshing(false);
    toast.success('Booking requests refreshed');
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
          {selectedTab === 'calendar' && (
            <>
              <Select 
                value={statusFilter} 
                onValueChange={(value) => updateStatusFilter(value as BookingStatus | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="blocked">Blocked Dates</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button onClick={() => handleOpenCreateModal('booking')} className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Booking</span>
                </Button>
                
                <Button variant="outline" onClick={() => handleOpenCreateModal('block')} className="flex items-center gap-1">
                  <CalendarRange className="h-4 w-4" />
                  <span>Block Dates</span>
                </Button>
              </div>
            </>
          )}
          
          {selectedTab === 'direct-bookings' && (
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
          )}
        </div>
      </div>

      <Tabs defaultValue="calendar" onValueChange={(value) => setSelectedTab(value as 'calendar' | 'direct-bookings')}>
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="direct-bookings">Direct Booking Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <BookingTable 
            bookings={bookings} 
            onStatusChange={handleStatusChange}
            onBookingClick={handleBookingClick}
            onDeleteBooking={handleDeleteBooking}
          />
        </TabsContent>
        
        <TabsContent value="direct-bookings">
          <div className="rounded-md border">
            {/* We'll reuse the existing AdminBookingRequests component via its hook */}
            {isLoadingRequests ? (
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
        </TabsContent>
      </Tabs>
      
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          isOpen={!!selectedBooking} 
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onDeleteBooking={handleDeleteBooking}
        />
      )}
      
      <BookingCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateBooking={handleCreateBooking}
        mode={createMode}
      />
    </div>
  );
};

export default AdminBookings;

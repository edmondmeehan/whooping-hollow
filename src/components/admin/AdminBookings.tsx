
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsHeader from './bookings/BookingsHeader';
import CalendarTab from './bookings/CalendarTab';
import DirectBookingsTab from './bookings/DirectBookingsTab';

const AdminBookings = () => {
  const [selectedTab, setSelectedTab] = useState<'calendar' | 'direct-bookings'>('calendar');
  
  return (
    <div>
      <BookingsHeader selectedTab={selectedTab} />

      <Tabs defaultValue="calendar" onValueChange={(value) => setSelectedTab(value as 'calendar' | 'direct-bookings')}>
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="direct-bookings">Direct Booking Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <CalendarTab />
        </TabsContent>
        
        <TabsContent value="direct-bookings">
          <DirectBookingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBookings;

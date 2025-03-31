
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useSubscribers } from './newsletter/useSubscribers';
import NewsletterForm from './newsletter/NewsletterForm';
import SubscribersList from './newsletter/SubscribersList';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AdminNewsletter = () => {
  const { subscribers, handleRemoveSubscriber } = useSubscribers();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Newsletter</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              Send Newsletter
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      The newsletter will be sent to all subscribers using the Resend API.
                      Make sure you've added your Resend API key in the API Keys tab.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Compose and send a newsletter to all subscribers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewsletterForm subscribers={subscribers} />
          </CardContent>
        </Card>
        
        <Card>
          <SubscribersList 
            subscribers={subscribers} 
            onRemoveSubscriber={handleRemoveSubscriber} 
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminNewsletter;

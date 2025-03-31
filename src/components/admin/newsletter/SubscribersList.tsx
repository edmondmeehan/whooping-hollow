
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, Copy, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscribersListProps {
  subscribers: string[];
  onRemoveSubscriber: (email: string) => void;
}

const SubscribersList: React.FC<SubscribersListProps> = ({ subscribers, onRemoveSubscriber }) => {
  const copySubscribers = () => {
    navigator.clipboard.writeText(subscribers.join(', '));
    toast.success('Subscriber emails copied to clipboard');
  };
  
  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscribers</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {subscribers.length}
          </div>
        </div>
        <CardDescription>
          Manage your newsletter subscribers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscribers.length === 0 ? (
          <Alert>
            <AlertDescription>
              No subscribers yet. Add the newsletter form to your website to collect subscribers.
            </AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="h-[290px]">
            <ul className="space-y-2">
              {subscribers.map((email) => (
                <li key={email} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-md">
                  <span className="text-sm truncate max-w-[170px]">{email}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => onRemoveSubscriber(email)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copySubscribers}
            disabled={subscribers.length === 0}
            className="w-full"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy All Emails
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default SubscribersList;

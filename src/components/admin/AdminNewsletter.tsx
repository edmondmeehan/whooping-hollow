
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Send, Users, Copy, AlertCircle, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendNewsletterEmail } from '@/utils/email/newsletterEmails';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    loadSubscribers();
  }, []);
  
  const loadSubscribers = () => {
    try {
      const storedSubscribers = JSON.parse(localStorage.getItem('whh_newsletter_subscribers') || '[]');
      setSubscribers(storedSubscribers);
    } catch (error) {
      console.error('Error loading subscribers:', error);
      setSubscribers([]);
    }
  };
  
  const handleRemoveSubscriber = (email: string) => {
    try {
      const updatedSubscribers = subscribers.filter(sub => sub !== email);
      localStorage.setItem('whh_newsletter_subscribers', JSON.stringify(updatedSubscribers));
      setSubscribers(updatedSubscribers);
      toast.success(`Removed ${email} from subscribers`);
    } catch (error) {
      console.error('Error removing subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };
  
  const handleSendNewsletter = async () => {
    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter newsletter content');
      return;
    }
    
    if (subscribers.length === 0) {
      toast.error('No subscribers to send to');
      return;
    }
    
    // Check if we have the Resend API key
    const apiKeys = JSON.parse(localStorage.getItem('whh_api_keys') || '[]');
    const resendKey = apiKeys.find((key: any) => 
      key.name === 'Resend API' || 
      key.name.toLowerCase().includes('resend')
    );
    
    if (!resendKey?.key) {
      toast.error('Resend API key is missing', {
        description: 'Please add your Resend API key in the API Keys tab'
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      console.log('Starting to send newsletter...');
      const success = await sendNewsletterEmail(subscribers, subject, content);
      
      if (success) {
        toast.success('Newsletter sent successfully!');
        setSubject('');
        setContent('');
      } else {
        toast.error('Failed to send newsletter');
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast.error('Failed to send newsletter');
    } finally {
      setIsSending(false);
    }
  };
  
  const copySubscribers = () => {
    navigator.clipboard.writeText(subscribers.join(', '));
    toast.success('Subscriber emails copied to clipboard');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Newsletter</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copySubscribers}
            disabled={subscribers.length === 0}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy All Emails
          </Button>
        </div>
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Newsletter subject"
                  disabled={isSending}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your newsletter content here..."
                  rows={12}
                  disabled={isSending}
                  className="resize-none"
                />
              </div>
              
              <div className="pt-2">
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    <strong>Important:</strong> Make sure you've added a valid Resend API key in the API Keys tab.
                    You must also verify your sending domain in the Resend dashboard or use the default <code>onboarding@resend.dev</code> address for testing.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={handleSendNewsletter} 
                  disabled={isSending || !subject || !content || subscribers.length === 0}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSending ? 'Sending...' : `Send to ${subscribers.length} Subscribers`}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
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
                        onClick={() => handleRemoveSubscriber(email)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminNewsletter;

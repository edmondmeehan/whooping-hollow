
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, AlertCircle, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { sendNewsletterEmail } from '@/utils/email/newsletterEmails';

interface NewsletterFormProps {
  subscribers: string[];
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ subscribers }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  
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
  
  return (
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
  );
};

export default NewsletterForm;

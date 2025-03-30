
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SecurityNotice: React.FC = () => {
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-800">Security Notice</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 text-sm">
          For demonstration purposes, API keys and Cloudinary URL are stored in the browser's local storage. 
          In a production environment, these should be securely stored on a server with proper encryption.
          The Resend API allows you to send up to 100 emails per day on their free tier.
          Consider connecting to Supabase for more secure API key management.
        </p>
      </CardContent>
    </Card>
  );
};

export default SecurityNotice;


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
          For demonstration purposes, API keys are stored in the browser's local storage. 
          In a production environment, these should be securely stored on a server with proper encryption.
        </p>
      </CardContent>
    </Card>
  );
};

export default SecurityNotice;

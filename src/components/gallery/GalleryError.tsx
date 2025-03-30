
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DatabaseIcon, RefreshCw } from 'lucide-react';

interface GalleryErrorProps {
  error: string;
}

const GalleryError: React.FC<GalleryErrorProps> = ({ error }) => {
  const isSupabaseError = error.includes("Supabase");
  
  return (
    <Card className="p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="flex flex-col items-center justify-center text-center">
        {isSupabaseError ? (
          <DatabaseIcon className="h-12 w-12 text-red-400 mb-4" />
        ) : (
          <RefreshCw className="h-12 w-12 text-red-400 mb-4" />
        )}
        
        <p className="text-red-500 mb-4">{error}</p>
        
        {isSupabaseError ? (
          <div className="space-y-4">
            <p className="text-gray-600 max-w-md">
              To fix this, you need to set up your Supabase environment variables. 
              Go to your Supabase project settings to find your URL and anon key.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/admin'}>
              Go to Admin Panel
            </Button>
          </div>
        ) : (
          <Button onClick={() => window.location.reload()}>
            Retry Loading Images
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GalleryError;

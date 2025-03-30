
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, ExternalLink, CalendarCheck, CreditCard, Lock, Mail, Send, Cloud } from 'lucide-react';
import { ApiKey } from './apiKeyUtils';

interface ApiKeyCardProps {
  api: ApiKey;
  onToggleVisibility: (id: string) => void;
  onUpdateKey: (id: string, key: string) => void;
  onDelete: (id: string) => void;
}

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ 
  api, 
  onToggleVisibility, 
  onUpdateKey, 
  onDelete 
}) => {
  const getIconComponent = (name: string) => {
    if (name.toLowerCase().includes('airbnb')) return <ExternalLink className="h-5 w-5" />;
    if (name.toLowerCase().includes('email')) return <Mail className="h-5 w-5" />;
    if (name.toLowerCase().includes('payment')) return <CreditCard className="h-5 w-5" />;
    if (name.toLowerCase().includes('booking')) return <CalendarCheck className="h-5 w-5" />;
    if (name.toLowerCase().includes('resend')) return <Send className="h-5 w-5" />;
    if (name.toLowerCase().includes('cloudinary')) return <Cloud className="h-5 w-5" />;
    return <Lock className="h-5 w-5" />;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIconComponent(api.name)}
            <CardTitle>{api.name}</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(api.id)}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Securely store your {api.name} credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor={`api-key-${api.id}`}>API Key</Label>
          <div className="flex">
            <Input
              id={`api-key-${api.id}`}
              type={api.isVisible ? "text" : "password"}
              value={api.key}
              onChange={(e) => onUpdateKey(api.id, e.target.value)}
              placeholder="Enter your API key"
              className="flex-1"
            />
            <Button 
              variant="outline" 
              className="ml-2" 
              type="button"
              onClick={() => onToggleVisibility(api.id)}
            >
              {api.isVisible ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyCard;

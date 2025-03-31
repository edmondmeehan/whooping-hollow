
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SaveIcon } from 'lucide-react';
import { GuideCredentials } from '@/types/guide';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface GuideCredentialsCardProps {
  guideCredentials: GuideCredentials;
  setGuideCredentials: React.Dispatch<React.SetStateAction<GuideCredentials>>;
  onSave: () => void;
}

const GuideCredentialsCard = ({ 
  guideCredentials, 
  setGuideCredentials, 
  onSave 
}: GuideCredentialsCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-4">Guide Access Credentials</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Username</p>
            <Input
              value={guideCredentials.username}
              onChange={(e) => setGuideCredentials({
                ...guideCredentials,
                username: e.target.value
              })}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Password</p>
            <Input
              type="password"
              value={guideCredentials.password}
              onChange={(e) => setGuideCredentials({
                ...guideCredentials,
                password: e.target.value
              })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="syncWithWifi" 
              checked={guideCredentials.syncWithWifi}
              onCheckedChange={(checked) => 
                setGuideCredentials({
                  ...guideCredentials,
                  syncWithWifi: checked === true
                })
              }
            />
            <label 
              htmlFor="syncWithWifi" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sync with Wi-Fi credentials
            </label>
          </div>
          <div className="flex justify-end">
            <Button onClick={onSave}>
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Credentials
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideCredentialsCard;

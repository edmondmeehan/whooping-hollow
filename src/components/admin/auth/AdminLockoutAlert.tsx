
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockIcon } from 'lucide-react';

interface AdminLockoutAlertProps {
  formattedTime: string;
}

const AdminLockoutAlert = ({ formattedTime }: AdminLockoutAlertProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <LockIcon className="h-4 w-4" />
      <AlertDescription>
        Too many failed attempts. Please try again in {formattedTime}.
      </AlertDescription>
    </Alert>
  );
};

export default AdminLockoutAlert;

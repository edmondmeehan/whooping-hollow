
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface AdminWarningAlertProps {
  attemptsRemaining: number;
}

const AdminWarningAlert = ({ attemptsRemaining }: AdminWarningAlertProps) => {
  return (
    <Alert className="mb-4 bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-amber-600">
        Invalid credentials. Attempts remaining: {attemptsRemaining}.
      </AlertDescription>
    </Alert>
  );
};

export default AdminWarningAlert;

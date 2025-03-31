
import React from 'react';
import { AlertCircle } from 'lucide-react';

const SecurityNotice: React.FC = () => {
  return (
    <div className="mt-4 flex items-center p-2 bg-amber-50 rounded-md border border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
      <p className="text-sm text-amber-700">
        Keep system access codes confidential and only share with authorized individuals.
      </p>
    </div>
  );
};

export default SecurityNotice;

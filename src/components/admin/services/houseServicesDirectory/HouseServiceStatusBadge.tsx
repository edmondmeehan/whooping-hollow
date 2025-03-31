
import React from 'react';

interface HouseServiceStatusBadgeProps {
  status: string;
}

const HouseServiceStatusBadge: React.FC<HouseServiceStatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'Active' ? 'bg-green-100 text-green-800' : 
      status === 'Updated' ? 'bg-blue-100 text-blue-800' : 
      'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );
};

export default HouseServiceStatusBadge;

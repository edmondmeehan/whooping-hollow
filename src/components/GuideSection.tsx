
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GuideSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const GuideSection = ({ title, icon, children }: GuideSectionProps) => {
  return (
    <Card className="shadow-md mb-8">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center text-xl font-medium">
          <span className="mr-2 text-coastal-600">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default GuideSection;

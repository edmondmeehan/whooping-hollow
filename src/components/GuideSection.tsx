
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GuideSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const GuideSection = ({ title, icon, children }: GuideSectionProps) => {
  return (
    <Card className="shadow-[var(--shadow-soft)] mb-8 border-border hover:shadow-[var(--shadow-elegant)] transition-shadow duration-300">
      <CardHeader className="border-b border-border pb-4 bg-muted/30">
        <CardTitle className="flex items-center text-xl font-serif font-semibold text-foreground">
          <span className="mr-3 text-primary flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">{icon}</span>
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

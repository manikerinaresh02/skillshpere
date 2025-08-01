import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DebugComponentProps {
  componentName: string;
  children: React.ReactNode;
}

export const DebugComponent: React.FC<DebugComponentProps> = ({ componentName, children }) => {
  return (
    <div>
      <Card className="glass-card mb-4">
        <CardHeader>
          <CardTitle>Debug: {componentName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Attempting to render {componentName}...</p>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}; 
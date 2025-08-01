import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestComponentProps {
  name: string;
}

export const TestComponent: React.FC<TestComponentProps> = ({ name }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Test Component: {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a test component for {name}. If you can see this, the component is loading correctly.</p>
      </CardContent>
    </Card>
  );
}; 
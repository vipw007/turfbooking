import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface PlaceholderProps {
  title: string;
  description?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md rounded-2xl p-8 text-center">
        <div className="mb-4 text-6xl">🚧</div>
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        {description && <p className="mb-6 text-muted-foreground">{description}</p>}
        <Link to="/">
          <Button className="rounded-xl" style={{ background: 'var(--sport-accent)' }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

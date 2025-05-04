
import React from 'react';
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  title: string;
  buttonText: string;
  loading: boolean;
  onClick: () => void;
}

export function SubscriptionButton({ 
  title, 
  buttonText, 
  loading, 
  onClick 
}: SubscriptionButtonProps) {
  return (
    <Button 
      size="lg" 
      className="w-full mb-6"
      onClick={onClick}
      variant={title.toLowerCase().includes('freemium') ? 'outline' : 'default'}
      disabled={loading}
    >
      {loading ? "Processing..." : buttonText}
    </Button>
  );
}

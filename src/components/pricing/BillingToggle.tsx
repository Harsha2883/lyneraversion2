
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface BillingToggleProps {
  value: 'monthly' | 'annual';
  onValueChange: (value: 'monthly' | 'annual') => void;
}

export function BillingToggle({ value, onValueChange }: BillingToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleValueChange = async (val: string) => {
    if (!val || (val !== 'monthly' && val !== 'annual')) {
      console.error('Invalid billing period:', val);
      return;
    }

    try {
      setIsLoading(true);
      await onValueChange(val as 'monthly' | 'annual');
    } catch (error) {
      console.error('Error changing billing period:', error);
      toast.error("Failed to update billing period. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-12 w-[300px] mx-auto rounded-lg" />;
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="text-sm text-muted-foreground">Choose billing period</div>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={handleValueChange}
          className="bg-muted p-1 rounded-lg"
          aria-label="Select billing period"
        >
          <ToggleGroupItem 
            value="monthly" 
            className="px-6" 
            aria-label="Monthly billing"
          >
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="annual" 
            className="px-6" 
            aria-label="Annual billing"
          >
            Annual
            <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
              Save 20%
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </ErrorBoundary>
  );
}

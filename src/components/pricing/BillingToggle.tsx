
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { CalendarDays, CalendarDays as MonthlyIcon } from "lucide-react";

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
      <div id="billing-toggle" className="flex flex-col items-center gap-4 mb-8 p-4 rounded-lg bg-secondary/50">
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
            className="px-6 gap-2" 
            aria-label="Monthly billing"
          >
            <MonthlyIcon className="h-4 w-4" />
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="annual" 
            className="px-6 gap-2" 
            aria-label="Annual billing"
          >
            <CalendarDays className="h-4 w-4" />
            Annual
            <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
              Save 20%
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-xs text-muted-foreground mt-2">
          {value === 'annual' ? 'Save 20% with annual billing' : 'Switch to annual billing to save 20%'}
        </p>
      </div>
    </ErrorBoundary>
  );
}

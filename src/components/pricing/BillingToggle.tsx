
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface BillingToggleProps {
  value: 'monthly' | 'annual';
  onValueChange: (value: 'monthly' | 'annual') => void;
}

export function BillingToggle({ value, onValueChange }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="text-sm text-muted-foreground">Choose billing period</div>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onValueChange(val as 'monthly' | 'annual')}
        className="bg-muted p-1 rounded-lg"
      >
        <ToggleGroupItem value="monthly" className="px-6">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="annual" className="px-6">
          Annual
          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Save 20%</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}


import React from 'react';
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function PricingFeatureWithTooltip({ 
  feature, 
  tooltip,
  isNegative = false
}: { 
  feature: string; 
  tooltip: string;
  isNegative?: boolean;
}) {
  return (
    <div className="flex items-center">
      <Check className={`h-4 w-4 mr-2 flex-shrink-0 ${isNegative ? "text-muted-foreground" : "text-primary"}`} />
      <span>{feature}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

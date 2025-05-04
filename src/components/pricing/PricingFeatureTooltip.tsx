
import React from 'react';
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingFeatureTooltipProps {
  feature: string;
  tooltip: string;
  isNegative?: boolean;
}

export function PricingFeatureTooltip({ feature, tooltip, isNegative = false }: PricingFeatureTooltipProps) {
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

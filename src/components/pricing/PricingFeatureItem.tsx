
import React from 'react';
import { Check } from "lucide-react";

interface PricingFeatureItemProps {
  text: string;
  isNegative?: boolean;
}

export function PricingFeatureItem({ text, isNegative = false }: PricingFeatureItemProps) {
  return (
    <div className="flex items-center">
      <Check className={`h-4 w-4 mr-2 flex-shrink-0 ${isNegative ? "text-muted-foreground" : "text-primary"}`} />
      <span>{text}</span>
    </div>
  );
}

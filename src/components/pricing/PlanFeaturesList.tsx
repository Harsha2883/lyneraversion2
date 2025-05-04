
import React from 'react';
import { PricingFeatureItem } from './PricingFeatureItem';
import { PricingFeatureTooltip } from './PricingFeatureTooltip';

interface Feature {
  text: string;
  tooltip?: string;
  isNegative?: boolean;
}

interface PlanFeaturesListProps {
  features: Feature[];
}

export function PlanFeaturesList({ features }: PlanFeaturesListProps) {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        feature.tooltip ? (
          <PricingFeatureTooltip
            key={index}
            feature={feature.text}
            tooltip={feature.tooltip}
            isNegative={feature.isNegative}
          />
        ) : (
          <PricingFeatureItem 
            key={index} 
            text={feature.text} 
            isNegative={feature.isNegative} 
          />
        )
      ))}
    </div>
  );
}


import React from 'react';
import { Button } from "@/components/ui/button";
import { PricingFeature, PricingFeatureWithTooltip } from './PricingFeature';

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    tooltip?: string;
    isNegative?: boolean;
  }>;
  isRecommended?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  priceSubtext?: string;
}

export function PlanCard({
  title,
  price,
  description,
  features,
  isRecommended,
  buttonText,
  onButtonClick,
  priceSubtext
}: PlanCardProps) {
  return (
    <div className={`border rounded-lg overflow-hidden bg-card shadow-sm transition-all duration-200 hover:shadow-md ${isRecommended ? 'border-primary relative' : ''}`}>
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
          RECOMMENDED
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <div className="text-3xl font-bold mb-1">{price}</div>
        {priceSubtext && (
          <div className="text-sm text-muted-foreground mb-4">{priceSubtext}</div>
        )}
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Button 
          size="lg" 
          className="w-full mb-6"
          onClick={onButtonClick}
          variant={title.toLowerCase().includes('freemium') ? 'outline' : 'default'}
        >
          {buttonText}
        </Button>

        <div className="space-y-3">
          {features.map((feature, index) => (
            feature.tooltip ? (
              <PricingFeatureWithTooltip
                key={index}
                feature={feature.text}
                tooltip={feature.tooltip}
                isNegative={feature.isNegative}
              />
            ) : (
              <PricingFeature key={index}>{feature.text}</PricingFeature>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

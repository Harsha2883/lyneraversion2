
import React from 'react';

interface PlanHeaderProps {
  title: string;
  price: string;
  priceSubtext?: string;
  description: string;
  isRecommended?: boolean;
}

export function PlanHeader({ 
  title, 
  price, 
  priceSubtext, 
  description, 
  isRecommended 
}: PlanHeaderProps) {
  return (
    <>
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
          RECOMMENDED
        </div>
      )}
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <div className="text-3xl font-bold mb-1">{price}</div>
      {priceSubtext && (
        <div className="text-sm text-muted-foreground mb-4">{priceSubtext}</div>
      )}
      <p className="text-muted-foreground mb-6">{description}</p>
    </>
  );
}

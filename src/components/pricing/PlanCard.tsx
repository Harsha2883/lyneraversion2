
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Check, Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
  priceId?: string;
}

// Component for displaying a feature with a tooltip
function PricingFeatureWithTooltip({ 
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

// Component for displaying a simple feature
function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function PlanCard({
  title,
  price,
  description,
  features,
  isRecommended,
  buttonText,
  onButtonClick,
  priceSubtext,
  priceId
}: PlanCardProps) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscription = async () => {
    // Clear previous errors
    setError(null);
    
    if (!user) {
      toast.info("Please sign in to continue");
      navigate("/auth");
      return;
    }

    if (!priceId) {
      onButtonClick();
      return;
    }

    setLoading(true);
    try {
      console.log(`Starting checkout process for ${priceId}`);
      
      const requestData = {
        priceId,
        email: user.email,
        userId: user.id,
        userType: profile?.user_type
      };
      
      console.log("Sending request data:", requestData);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: requestData
      });

      if (error) {
        console.error("Checkout invoke error:", error);
        throw new Error(`Invoke error: ${error.message || JSON.stringify(error)}`);
      }
      
      if (!data) {
        throw new Error('No data returned from checkout function');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data?.url) {
        console.log("Redirecting to checkout URL:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';
      setError(errorMessage);
      toast.error(`Failed to start checkout process: ${errorMessage}`);
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

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
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          size="lg" 
          className="w-full mb-6"
          onClick={handleSubscription}
          variant={title.toLowerCase().includes('freemium') ? 'outline' : 'default'}
          disabled={loading}
        >
          {loading ? "Processing..." : buttonText}
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

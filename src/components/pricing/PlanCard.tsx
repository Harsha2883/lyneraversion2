
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlanHeader } from "./PlanHeader";
import { PlanErrorAlert } from "./PlanErrorAlert";
import { SubscriptionButton } from "./SubscriptionButton";
import { PlanFeaturesList } from "./PlanFeaturesList";

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
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscription = async () => {
    setError(null);
    
    if (!user) {
      toast.info("Please sign in to continue");
      localStorage.setItem("redirectAfterAuth", "/pricing");
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
      console.log("User authenticated:", !!user);
      console.log("User profile:", profile);
      console.log("Session exists:", !!session);
      
      if (!session) {
        throw new Error('No active session found. Please log in again.');
      }

      const accessToken = session.access_token;
      console.log("Using access token for authorization");

      const { data, error: invokeError } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          priceId,
          email: user.email,
          userId: user.id,
          userType: profile?.user_type
        }
      });

      console.log("Checkout function response:", data, invokeError);

      if (invokeError) {
        console.error("Checkout invoke error:", invokeError);
        throw new Error(`Failed to start checkout: ${invokeError.message || 'Unknown error'}`);
      }
      
      if (!data) {
        throw new Error('No response from checkout function');
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
      <div className="p-6">
        <PlanHeader 
          title={title}
          price={price}
          priceSubtext={priceSubtext}
          description={description}
          isRecommended={isRecommended}
        />
        
        <PlanErrorAlert error={error} />
        
        <SubscriptionButton 
          title={title}
          buttonText={buttonText}
          loading={loading}
          onClick={handleSubscription}
        />

        <PlanFeaturesList features={features} />
      </div>
    </div>
  );
}

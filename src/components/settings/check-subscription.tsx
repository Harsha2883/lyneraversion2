
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function CheckSubscription() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const checkSubscriptionStatus = async () => {
    if (!user?.email) {
      toast.error("You must be logged in to check your subscription status");
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        body: { email: user.email }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.subscribed) {
        toast.success(`Active subscription found! Plan: ${data.subscription?.plan || 'Unknown'}`);
        toast.success(`Your subscription renews on ${new Date(data.subscription?.current_period_end).toLocaleDateString()}`);
      } else {
        if (data.customer_id) {
          toast.info("You don't have any active subscriptions");
        } else {
          toast.info("You don't have a Stripe customer account yet");
        }
      }
    } catch (error: any) {
      toast.error(`Error checking subscription: ${error.message}`);
      console.error("Subscription check error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button
      variant="outline"
      onClick={checkSubscriptionStatus}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      {loading ? 'Checking...' : 'Check Subscription Status'}
    </Button>
  );
}

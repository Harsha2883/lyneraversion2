
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CreditCard, ExternalLink, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionDetails {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  customer_id: string | null;
}

export function SubscriptionManagement() {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  const checkSubscription = async () => {
    if (!user || !session) {
      setError("You must be logged in to check subscription status");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Checking subscription status for user:", user.id);
      
      const { data, error: invokeError } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          email: user.email,
          userId: user.id
        }
      });

      if (invokeError) {
        console.error("Error checking subscription:", invokeError);
        setError(`Failed to check subscription: ${invokeError.message || 'Unknown error'}`);
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }
      
      console.log("Subscription status:", data);
      setSubscription(data);
      
    } catch (error: any) {
      console.error("Error verifying subscription:", error);
      setError(`Failed to verify subscription: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!subscription?.customer_id) {
      toast.error("No customer ID found. Please subscribe first.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session?.access_token || ''}`,
        },
        body: { customerId: subscription.customer_id }
      });

      if (error) {
        throw error;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error: any) {
      toast.error(`Failed to open customer portal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Initial check
  useEffect(() => {
    if (user && session) {
      checkSubscription();
    }
  }, [user, session]);

  const formatSubscriptionTier = (tier: string | null) => {
    if (!tier) return "No subscription";
    
    // Convert snake_case or kebab-case to title case
    return tier
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing settings
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {loading && !subscription ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : subscription ? (
          <>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Current Plan</h3>
              <p className="font-medium text-xl">
                {subscription.subscribed 
                  ? formatSubscriptionTier(subscription.subscription_tier)
                  : "Free Plan"}
              </p>
              
              {subscription.subscribed && subscription.subscription_end && (
                <p className="text-sm text-muted-foreground">
                  Renews on {new Date(subscription.subscription_end).toLocaleDateString()}
                </p>
              )}
            </div>
            
            {subscription.subscribed ? (
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openCustomerPortal}
                  disabled={loading}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Billing
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-4">
                <p className="text-muted-foreground">
                  You're currently on the free plan. Upgrade to access premium features.
                </p>
                <Button
                  onClick={() => window.location.href = "/pricing"}
                  className="w-full"
                >
                  View Plans
                </Button>
              </div>
            )}
          </>
        ) : null}
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-sm text-muted-foreground">
          Need help? Contact support@lynera.ai
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={checkSubscription}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

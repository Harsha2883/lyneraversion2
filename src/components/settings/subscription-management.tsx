
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, RefreshCw, CreditCard, CalendarDays } from "lucide-react";

interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

export function SubscriptionManagement() {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);

  const checkSubscriptionStatus = async () => {
    if (!user || !session) {
      toast.error("You must be logged in to check subscription status");
      return;
    }
    
    setCheckingStatus(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSubscriptionInfo(data);
      toast.success("Subscription status updated");
    } catch (error: any) {
      console.error("Error checking subscription:", error);
      toast.error(`Failed to check subscription: ${error.message || "Unknown error"}`);
    } finally {
      setCheckingStatus(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!user || !session) {
      toast.error("You must be logged in to manage your subscription");
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          returnUrl: window.location.origin + "/settings"
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error: any) {
      console.error("Error opening customer portal:", error);
      toast.error(`Failed to open subscription management: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && session) {
      checkSubscriptionStatus();
    }
  }, [user, session]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>View and manage your current subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!subscriptionInfo && !checkingStatus ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No subscription information found</p>
            <Button 
              onClick={checkSubscriptionStatus} 
              variant="outline" 
              disabled={checkingStatus || !user}
            >
              Check Subscription Status
            </Button>
          </div>
        ) : checkingStatus ? (
          <div className="space-y-4 py-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        ) : subscriptionInfo && (
          <div className="space-y-6">
            <div className="rounded-md border p-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="space-y-1 mb-3 sm:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Subscription Status</h3>
                  <Badge variant={subscriptionInfo.subscribed ? "default" : "secondary"}>
                    {subscriptionInfo.subscribed ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {subscriptionInfo.subscribed && (
                  <>
                    <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Plan: {subscriptionInfo.subscription_tier || "Standard"}</span>
                    </div>
                    {subscriptionInfo.subscription_end && (
                      <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>Renews on {new Date(subscriptionInfo.subscription_end).toLocaleDateString()}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkSubscriptionStatus}
                  disabled={checkingStatus}
                >
                  {checkingStatus ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Refreshing
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </>
                  )}
                </Button>
                {subscriptionInfo.subscribed && (
                  <Button 
                    size="sm" 
                    onClick={openCustomerPortal}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <>
                        Manage Plan
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            
            {!subscriptionInfo.subscribed && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade your account to access premium features
                </p>
                <Button 
                  onClick={() => window.location.href = '/pricing'}
                >
                  View Plans
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionStatus {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  customer_id: string | null;
}

export function SubscriptionVerifier({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSubscription = async () => {
    if (!user || !session) {
      setError("You must be logged in to check subscription status");
      return;
    }

    setChecking(true);
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
      setStatus(data);
      
      if (data.subscribed) {
        toast.success(`Active subscription confirmed: ${data.subscription_tier}`);
      }
    } catch (error: any) {
      console.error("Error verifying subscription:", error);
      setError(`Failed to verify subscription: ${error.message}`);
    } finally {
      setChecking(false);
    }
  };

  // Initial check on component mount
  useEffect(() => {
    if (user && session) {
      checkSubscription();
    }
  }, [user, session]);

  // Auto-refresh on success param (after checkout)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && user && session) {
      checkSubscription();
    }
  }, [user, session]);

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {checking ? (
        <div className="flex flex-col items-center space-y-2 my-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>
      ) : status ? (
        <div className="flex flex-col space-y-2">
          {status.subscribed ? (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription className="flex justify-between items-center">
                <div>
                  <span className="font-medium">Active Subscription: </span> 
                  {status.subscription_tier}
                  {status.subscription_end && (
                    <div className="text-sm mt-1">
                      Renews: {new Date(status.subscription_end).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkSubscription}
                  disabled={checking}
                  className="text-green-700 border-green-300 hover:bg-green-100"
                >
                  {checking ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkSubscription}
                disabled={checking}
                className="ml-auto flex items-center"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${checking ? 'animate-spin' : ''}`} />
                {checking ? 'Checking...' : 'Check Subscription'}
              </Button>
            </div>
          )}
        </div>
      ) : null}
      
      {children}
    </div>
  );
}

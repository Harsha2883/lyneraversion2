
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { CreditCard, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PaymentsTab() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error("You must be logged in to manage your subscription");
      return;
    }

    setLoading(true);
    try {
      // Retrieve the customer ID for Stripe
      const { data: customerData } = await supabase
        .from('subscribers')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

      // If no customer ID, notify the user
      if (!customerData?.stripe_customer_id) {
        toast.info("You don't have an active subscription to manage");
        return;
      }

      // Create the customer portal session
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: { customerId: customerData.stripe_customer_id }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Redirect to the customer portal
        window.location.href = data.url;
      } else {
        throw new Error("Failed to generate customer portal URL");
      }

    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
      console.error("Customer portal error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription Management</h3>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Manage Your Subscription
          </CardTitle>
          <CardDescription>
            View and manage your subscription details, update payment methods, or cancel your subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-secondary">
            <AlertDescription>
              Changes to your subscription will take effect immediately.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleManageSubscription}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Manage Subscription"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { FAQSection } from "@/components/pricing/FAQSection";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { LoadingState } from "@/components/ui/loading-state";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PricingNavigation } from "@/components/pricing/PricingNavigation";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function PricingPage() {
  const [searchParams] = useSearchParams();
  const { user, loading, session, profile } = useAuth();
  const navigate = useNavigate();
  const [checkingSubscription, setCheckingSubscription] = useState(false);
  
  // Handle success/canceled notifications
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast.success("Subscription successful! Welcome to your new plan.");
      // Here you would check subscription status and update the user's permissions
      checkSubscriptionStatus();
    }
    
    if (canceled === 'true') {
      toast.info("Payment canceled. If you have any questions, please contact support.");
    }

    // Redirect to auth if no user is logged in
    if (!loading && !user) {
      // Store intended destination
      localStorage.setItem("redirectAfterAuth", "/pricing");
      navigate("/auth");
    }

    // Cleanup smooth scrolling
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [searchParams, loading, user, navigate]);

  // Log authentication state
  useEffect(() => {
    console.log("PricingPage - Auth state:", {
      isLoading: loading,
      isAuthenticated: !!user,
      sessionExists: !!session,
      userId: user?.id,
      userType: profile?.user_type
    });
  }, [loading, user, session, profile]);

  // Function to check subscription status
  const checkSubscriptionStatus = async () => {
    if (!user || !session) return;
    
    setCheckingSubscription(true);
    try {
      // Here you would call an edge function to check the subscription status
      // This is where you'd verify with Stripe if the user has an active subscription
      console.log("Checking subscription status for user:", user.id);
      // For now, we'll just simulate this with a toast message
      setTimeout(() => {
        toast.success("Your subscription has been confirmed!");
        setCheckingSubscription(false);
      }, 1500);
    } catch (error) {
      console.error("Error checking subscription:", error);
      toast.error("Failed to verify subscription status");
      setCheckingSubscription(false);
    }
  };

  return (
    <PublicLayout>
      <PricingNavigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 pt-16 pb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your needs, whether you're learning or creating.
          </p>
          
          {searchParams.get('success') === 'true' && (
            <Alert className="mt-6 mx-auto max-w-2xl bg-green-50 text-green-800 border-green-200">
              <AlertDescription className="flex justify-between items-center">
                <span>Your subscription was successful! Your account has been upgraded.</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkSubscriptionStatus}
                  disabled={checkingSubscription}
                  className="ml-2 text-green-700 border-green-300 hover:bg-green-100"
                >
                  {checkingSubscription ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    'Verify Subscription'
                  )}
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {!loading && !user && (
            <Alert className="mt-6 mx-auto max-w-2xl">
              <AlertDescription>
                You'll need to sign in before subscribing to a plan. 
                You can explore the plans below and will be prompted to sign in when you select one.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="container mx-auto px-4 pb-8">
          <ErrorBoundary>
            {loading ? (
              <LoadingState className="py-8" />
            ) : (
              <div id="pricing-tabs">
                <PricingTabs />
              </div>
            )}
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <div id="faq">
            <FAQSection />
          </div>
        </ErrorBoundary>
      </div>
    </PublicLayout>
  );
}

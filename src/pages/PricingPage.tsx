
import React, { useEffect } from 'react';
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
import { SubscriptionVerifier } from "@/components/subscription/SubscriptionVerifier";

export default function PricingPage() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Handle success/canceled notifications
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast.success("Payment processing started! Please wait while we verify your subscription.");
    }
    
    if (canceled === 'true') {
      toast.info("Payment canceled. If you have any questions, please contact support.");
    }

    // Store intended destination for non-logged in users
    if (!loading && !user) {
      localStorage.setItem("redirectAfterAuth", "/pricing");
    }

    // Cleanup smooth scrolling
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [searchParams, loading, user, navigate]);

  return (
    <PublicLayout>
      <PricingNavigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 pt-16 pb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your needs, whether you're learning or creating.
          </p>
          
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
              <SubscriptionVerifier>
                <div id="pricing-tabs">
                  <PricingTabs />
                </div>
              </SubscriptionVerifier>
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

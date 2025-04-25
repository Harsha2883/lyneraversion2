
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { FAQSection } from "@/components/pricing/FAQSection";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PricingPage() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    // Check for query parameters from Stripe redirects
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast.success("Subscription successful! Welcome to your new plan.");
    }
    
    if (canceled === 'true') {
      toast.info("Payment canceled. If you have any questions, please contact support.");
    }
  }, [searchParams]);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Header Section */}
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

        {/* Pricing Tabs */}
        <div className="container mx-auto px-4 pb-8">
          <PricingTabs />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </PublicLayout>
  );
}

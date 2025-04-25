
import React from 'react';
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { FAQSection } from "@/components/pricing/FAQSection";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Header Section */}
        <div className="container mx-auto px-4 pt-16 pb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your needs, whether you're learning or creating.
          </p>
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


import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Learning Journey</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your learning needs and goals.
        </p>
      </div>

      {/* Pricing Cards Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Freemium Plan */}
          <div className="border rounded-lg overflow-hidden bg-card shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">Freemium Learner</h3>
              <div className="text-3xl font-bold mb-4">$0 <span className="text-base font-normal text-muted-foreground">forever</span></div>
              <p className="text-muted-foreground mb-6">Perfect for getting started on your learning journey.</p>
              
              <Button variant="outline" size="lg" className="w-full mb-6" onClick={() => navigate("/auth")}>
                Sign Up Free
              </Button>

              <div className="space-y-3">
                <PricingFeature>All courses marked as free</PricingFeature>
                <PricingFeature>Free certificates</PricingFeature>
                <PricingFeature>Earn tokens for learning</PricingFeature>
                <PricingFeature>E-library access to free content</PricingFeature>
                <PricingFeature>Free data-backed learning resources</PricingFeature>
                <PricingFeature>Standard Mentor AI agent and voice</PricingFeature>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg overflow-hidden bg-card shadow-md transition-all duration-200 hover:shadow-lg relative border-primary">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">Pro Learner</h3>
              <div className="text-3xl font-bold mb-1">$20 <span className="text-base font-normal text-muted-foreground">per month</span></div>
              <div className="text-sm text-muted-foreground mb-4">or $200 billed annually (save $40)</div>
              <p className="text-muted-foreground mb-6">Full access to all premium features and content.</p>
              
              <Button size="lg" className="w-full mb-6" onClick={() => navigate("/auth")}>
                Get Started
              </Button>

              <div className="space-y-3">
                <PricingFeature>Access to ALL courses, including premium</PricingFeature>
                <PricingFeature>Premium AI-enabled and data-backed courses</PricingFeature>
                <PricingFeature>Premium certificates</PricingFeature>
                <PricingFeature>Full e-library access</PricingFeature>
                <PricingFeature>Premium Mentor AI agent and voice</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
                <PricingFeature>Advanced learning analytics</PricingFeature>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-muted-foreground">Yes, you can change your plan at any time. When upgrading, you'll get immediate access to premium features. When downgrading, you'll retain premium access until your current billing period ends.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">How do tokens work?</h3>
            <p className="text-muted-foreground">Tokens are earned by completing courses and engaging with content. They can be redeemed for additional premium content, certificates, or discounts on your subscription.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">What's the difference between standard and premium AI mentor?</h3>
            <p className="text-muted-foreground">The premium AI mentor offers more personalized guidance, advanced topic expertise, and enhanced voice capabilities for a more natural and responsive learning experience.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Is there a refund policy?</h3>
            <p className="text-muted-foreground">Yes, we offer a 14-day money-back guarantee if you're not satisfied with your Pro subscription. Contact our support team for assistance with refunds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

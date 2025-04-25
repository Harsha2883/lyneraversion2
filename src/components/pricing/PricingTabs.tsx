
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanCard } from './PlanCard';

export function PricingTabs() {
  const navigate = useNavigate();
  
  const handleEnterpriseContact = () => {
    // Replace with your actual Google Form URL
    window.open('https://forms.gle/yourFormURL', '_blank');
  };

  return (
    <Tabs defaultValue="learner" className="max-w-5xl mx-auto">
      <TabsList className="grid grid-cols-2 w-[300px] mx-auto mb-8">
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="creator">Creator</TabsTrigger>
      </TabsList>

      <TabsContent value="learner">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PlanCard
            title="Freemium Learner"
            price="$0"
            priceSubtext="forever"
            description="Perfect for getting started on your learning journey."
            buttonText="Sign Up Free"
            onButtonClick={() => navigate("/auth")}
            features={[
              { text: "All courses marked as free" },
              { text: "Free certificates" },
              { text: "Earn tokens for learning" },
              { text: "E-library access to free content" },
              { text: "Free data-backed learning resources" },
              { text: "Standard Mentor AI agent and voice" }
            ]}
          />

          <PlanCard
            title="Pro Learner"
            price="$20"
            priceSubtext="or $200 billed annually (save $40)"
            description="Full access to all premium features and content."
            buttonText="Get Started"
            onButtonClick={() => navigate("/auth")}
            isRecommended
            features={[
              { text: "Access to ALL courses, including premium" },
              { text: "Premium AI-enabled and data-backed courses" },
              { text: "Premium certificates" },
              { text: "Full e-library access" },
              { text: "Premium Mentor AI agent and voice" },
              { text: "Priority support" },
              { text: "Advanced learning analytics" }
            ]}
          />

          <PlanCard
            title="Enterprise"
            price="Custom"
            description="Tailored solutions for your organization"
            buttonText="Contact Sales"
            onButtonClick={handleEnterpriseContact}
            features={[
              { text: "All Pro features included" },
              { text: "Custom learning paths" },
              { text: "Dedicated support team" },
              { text: "Custom integrations" },
              { text: "Analytics dashboard" },
              { text: "Priority feature requests" },
              { text: "SLA guarantees" }
            ]}
          />
        </div>
      </TabsContent>

      <TabsContent value="creator">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PlanCard
            title="Freemium Creator"
            price="$0"
            priceSubtext="forever"
            description="Start creating and sharing your knowledge."
            buttonText="Sign Up Free"
            onButtonClick={() => navigate("/auth")}
            features={[
              { text: "Conduct free courses - AI enabled and data enabled" },
              { text: "Issue certificates" },
              { text: "Issue tokens to learners" },
              { text: "Create e-library content" },
              { text: "Get 100 tokens on signing up", tooltip: "Tokens can be used to enhance your courses with AI features" },
              { text: "No roll-over of tokens", tooltip: "Tokens expire at the end of the month if unused", isNegative: true }
            ]}
          />

          <PlanCard
            title="Pro Creator"
            price="$20"
            priceSubtext="or $200 billed annually (save $40)"
            description="Unlock premium features to enhance your course creation."
            buttonText="Get Started"
            onButtonClick={() => navigate("/auth")}
            isRecommended
            features={[
              { text: "Conduct premium courses - AI enabled and data enabled" },
              { text: "Issue premium and blockchain-enabled certificates" },
              { text: "Issue tokens to learners" },
              { text: "Create premium e-library content" },
              { text: "Get 500 tokens", tooltip: "5x more tokens than the free plan for advanced AI features" },
              { text: "Roll-over of unused tokens" },
              { text: "Priority support for creators" },
              { text: "Advanced analytics and insights" }
            ]}
          />

          <PlanCard
            title="Enterprise Creator"
            price="Custom"
            description="For organizations and institutions"
            buttonText="Contact Sales"
            onButtonClick={handleEnterpriseContact}
            features={[
              { text: "All Pro Creator features included" },
              { text: "Multiple admin accounts" },
              { text: "Custom branding options" },
              { text: "Advanced analytics" },
              { text: "API access" },
              { text: "Custom integrations" },
              { text: "Dedicated success manager" }
            ]}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

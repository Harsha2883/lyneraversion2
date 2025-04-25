
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanCard } from './PlanCard';

export function CreatorPlans() {
  const navigate = useNavigate();
  
  const handleEnterpriseContact = () => {
    window.open('https://forms.gle/yourFormURL', '_blank');
  };

  return (
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
  );
}

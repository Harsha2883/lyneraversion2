
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanCard } from './PlanCard';
import { BillingToggle } from './BillingToggle';

export function CreatorPlans() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  const handleEnterpriseContact = () => {
    window.open('https://forms.gle/yourFormURL', '_blank');
  };

  const proPrice = billingPeriod === 'monthly' ? '$20' : '$200';
  const proPriceId = billingPeriod === 'monthly' ? 'pro-creator-monthly' : 'pro-creator-annual';
  const proPriceSubtext = billingPeriod === 'monthly' 
    ? 'per month'
    : 'per year (save $40)';

  return (
    <div className="flex flex-col items-center">
      <BillingToggle value={billingPeriod} onValueChange={setBillingPeriod} />
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
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
          price={proPrice}
          priceSubtext={proPriceSubtext}
          description="Unlock premium features to enhance your course creation."
          buttonText="Get Started"
          onButtonClick={() => {}}
          isRecommended
          priceId={proPriceId}
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
    </div>
  );
}

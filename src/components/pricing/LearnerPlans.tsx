
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanCard } from './PlanCard';

export function LearnerPlans() {
  const navigate = useNavigate();
  
  const handleEnterpriseContact = () => {
    window.open('https://forms.gle/yourFormURL', '_blank');
  };

  return (
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
  );
}

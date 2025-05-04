
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export function PlansTab() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // Set the active tab based on user profile
  useEffect(() => {
    if (profile?.user_type) {
      setActiveTab(profile.user_type);
    } else {
      setActiveTab("learner"); // Default to learner if no profile
    }
  }, [profile]);

  const learnerPlans = [
    {
      name: "Freemium",
      price: "Free",
      features: [
        "Access to free courses",
        "Free certificates",
        "Earn tokens for learning",
        "E-library access (free content)",
        "Standard Mentor AI agent",
      ],
      current: true,
    },
    {
      name: "Pro Learner",
      price: "$20/month",
      annualPrice: "$200/year (save $40)",
      features: [
        "Access to ALL courses",
        "Premium AI-enabled courses",
        "Premium certificates",
        "Full e-library access",
        "Premium Mentor AI agent",
        "Priority support",
      ],
      current: false,
    },
  ];
  
  const creatorPlans = [
    {
      name: "Freemium Creator",
      price: "Free",
      features: [
        "Conduct free courses",
        "Issue certificates",
        "Issue tokens",
        "Create e-library content",
        "Get 100 tokens on signup",
        "No roll-over of tokens",
      ],
      current: true,
    },
    {
      name: "Pro Creator",
      price: "$20/month",
      annualPrice: "$200/year (save $40)",
      features: [
        "Conduct premium courses",
        "Issue blockchain certificates",
        "Issue tokens",
        "Create premium e-library content",
        "Get 500 tokens",
        "Roll-over of tokens",
      ],
      current: false,
    },
  ];

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  // Don't render until we know which tab to show
  if (!activeTab) return null;

  const renderPlans = (plans, userType) => (
    <div className="grid gap-6 md:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <div>
              <p className="text-2xl font-bold">{plan.price}</p>
              {plan.annualPrice && !plan.current && (
                <p className="text-sm text-muted-foreground">{plan.annualPrice}</p>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant={plan.current ? "outline" : "default"}
              onClick={!plan.current ? handleUpgrade : undefined}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {!profile ? (
        <Tabs defaultValue="learner" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px] mb-6">
            <TabsTrigger value="learner">Learner Plans</TabsTrigger>
            <TabsTrigger value="creator">Creator Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learner" className="space-y-4">
            {renderPlans(learnerPlans, "learner")}
          </TabsContent>
          
          <TabsContent value="creator" className="space-y-4">
            {renderPlans(creatorPlans, "creator")}
          </TabsContent>
        </Tabs>
      ) : (
        <div>
          {activeTab === "learner" && renderPlans(learnerPlans, "learner")}
          {activeTab === "creator" && renderPlans(creatorPlans, "creator")}
        </div>
      )}
    </div>
  );
}

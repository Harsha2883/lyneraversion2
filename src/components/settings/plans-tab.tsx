
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PlansTab() {
  const navigate = useNavigate();
  
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="learner" className="w-full">
        <TabsList className="grid grid-cols-2 w-[300px] mb-6">
          <TabsTrigger value="learner">Learner Plans</TabsTrigger>
          <TabsTrigger value="creator">Creator Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="learner" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {learnerPlans.map((plan) => (
              <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
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
        </TabsContent>
        
        <TabsContent value="creator" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {creatorPlans.map((plan) => (
              <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

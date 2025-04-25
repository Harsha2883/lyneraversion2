
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PlansTab() {
  const navigate = useNavigate();
  const plans = [
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

  const handleUpgrade = () => {
    navigate("/pricing");  // Navigate to our new pricing page
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {plans.map((plan) => (
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
  );
}

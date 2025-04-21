
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PlansTab() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Access to free courses",
        "Basic learning tools",
        "Community support",
      ],
      current: false,
    },
    {
      name: "Premium",
      price: "$29.99/month",
      features: [
        "Access to all courses",
        "Advanced learning tools",
        "Priority support",
        "Offline downloads",
        "Certificate of completion",
      ],
      current: true,
    },
  ];

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
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

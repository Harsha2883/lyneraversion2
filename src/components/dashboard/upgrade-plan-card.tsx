
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function UpgradePlanCard() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Your Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-lg font-semibold">Freemium</div>
          <div className="text-xs text-muted-foreground mb-3">Limited features</div>
          <div className="text-sm">Upgrade to Pro for premium features and content</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate("/pricing")}
        >
          View Plans
        </Button>
      </CardFooter>
    </Card>
  );
}

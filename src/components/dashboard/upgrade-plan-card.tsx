
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpgradePlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Your Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-lg font-semibold">Starter</div>
          <div className="text-xs text-muted-foreground mb-3">Limited features</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">Upgrade Plan</Button>
      </CardFooter>
    </Card>
  );
}

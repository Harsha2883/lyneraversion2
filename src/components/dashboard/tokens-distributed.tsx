
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

export function TokensDistributed() {
  // Sample data for demonstration
  const totalTokens = 306;
  const lastDistribution = "2024-04-19";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Tokens Distributed</CardTitle>
        <Coins className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">{totalTokens}</div>
          <div className="text-xs text-muted-foreground">
            Last: {lastDistribution}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

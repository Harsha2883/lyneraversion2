
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { coins } from "lucide-react";

export function TokensTab() {
  // Mocked data for demonstration
  const tokenInfo = {
    total: 750,
    rank: "Silver",
    nextRank: "Gold",
    tokensToNextRank: 250,
    recentEarnings: [
      { id: 1, amount: 50, activity: "Completed Sustainability Quiz" },
      { id: 2, amount: 100, activity: "Finished Environmental Course" }
    ]
  };

  const progress = (tokenInfo.total / (tokenInfo.total + tokenInfo.tokensToNextRank)) * 100;

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Token Balance</CardTitle>
          <coins className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tokenInfo.total}</div>
          <div className="text-sm text-muted-foreground mb-4">
            Current rank: {tokenInfo.rank}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            {tokenInfo.tokensToNextRank} more tokens to {tokenInfo.nextRank} rank
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokenInfo.recentEarnings.map((earning) => (
              <div key={earning.id} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{earning.activity}</span>
                <span className="text-sm font-medium">+{earning.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export function TokensEarned() {
  // Mocked data for demonstration
  const tokensEarned = 750;
  const tokenRank = "Silver";
  const nextRankTokens = 1000;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Sustainability Tokens</CardTitle>
        <Award className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{tokensEarned}</div>
        <div className="text-xs text-muted-foreground">
          Current rank: {tokenRank}
        </div>
        <div className="text-xs text-muted-foreground">
          {nextRankTokens - tokensEarned} more tokens to Gold rank
        </div>
      </CardContent>
    </Card>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function TokensEarned() {
  // Mocked data for demonstration
  const tokensEarned = 165;
  const tokenRank = "Silver";
  const nextRankTokens = 250;
  const nextRank = "Gold";
  
  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((tokensEarned / nextRankTokens) * 100),
    100
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Sustainability Tokens</CardTitle>
        <Coins className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl font-bold">{tokensEarned}</div>
          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {tokenRank} Rank
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-1.5 mb-2" />
        
        <div className="text-xs text-muted-foreground">
          {nextRankTokens - tokensEarned} more tokens to {nextRank} rank
        </div>
      </CardContent>
    </Card>
  );
}

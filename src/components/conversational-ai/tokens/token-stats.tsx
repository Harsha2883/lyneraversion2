
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";
import { TokenStats } from "../types/token-types";

interface TokenStatsCardProps {
  stats: TokenStats;
}

export function TokenStatsCard({ stats }: TokenStatsCardProps) {
  // Calculate progress percentage for next rank
  const progressPercentage = Math.min(
    Math.round((stats.total / stats.nextRankTokens) * 100),
    100
  );

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Token Status</CardTitle>
        <Coins className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
            {stats.rank} Rank
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-2 mb-2" />
        
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>{stats.nextRankTokens - stats.total} more tokens to {stats.nextRank} rank</span>
          <span>{stats.total}/{stats.nextRankTokens}</span>
        </div>
      </CardContent>
    </Card>
  );
}

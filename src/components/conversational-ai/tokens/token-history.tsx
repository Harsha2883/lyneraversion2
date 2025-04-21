
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Award, Trophy, Users } from "lucide-react";
import { TokenEntry, TokenSource } from "../types/token-types";
import { formatDistanceToNow } from "date-fns";

interface TokenHistoryProps {
  tokens: TokenEntry[];
}

// Function to get the appropriate icon based on token source
const getTokenSourceIcon = (source: TokenSource) => {
  switch (source) {
    case "course_completion":
      return <Award className="h-4 w-4 text-primary" />;
    case "assessment_success":
      return <Coins className="h-4 w-4 text-yellow-500" />;
    case "top_performance":
      return <Trophy className="h-4 w-4 text-amber-500" />;
    case "participation":
      return <Users className="h-4 w-4 text-blue-500" />;
  }
};

export function TokenHistory({ tokens }: TokenHistoryProps) {
  return (
    <div className="space-y-4">
      {tokens.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No token history found</p>
      ) : (
        tokens.map((entry) => (
          <Card key={entry.id} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-2">
                {getTokenSourceIcon(entry.source)}
                <CardTitle className="text-base font-medium">{entry.description}</CardTitle>
              </div>
              <div className="flex items-center font-semibold text-primary">
                +{entry.amount} <Coins className="ml-1 h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

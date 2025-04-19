
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";

export function TokensTab() {
  // Mocked data for demonstration
  const tokenHistory = [
    { 
      id: 1, 
      description: "Completed Sustainability Course", 
      tokens: 50, 
      date: "2024-01-15" 
    },
    { 
      id: 2, 
      description: "Passed Carbon Footprint Assessment", 
      tokens: 25, 
      date: "2024-02-20" 
    }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {tokenHistory.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <Coins className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">{entry.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Tokens Earned: {entry.tokens}</p>
              <p className="text-muted-foreground">{entry.date}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenHistory } from "./tokens/token-history";
import { TokenStatsCard } from "./tokens/token-stats";
import { TokenRedemption } from "./tokens/token-redemption";
import { mockTokenHistory, mockRedemptionOptions, mockTokenStats } from "./data/mock-tokens";

export function TokensTab() {
  return (
    <div className="mt-6 space-y-6">
      <TokenStatsCard stats={mockTokenStats} />
      
      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Tokens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <div className="mt-4">
            <TokenHistory tokens={mockTokenHistory} />
          </div>
        </TabsContent>
        
        <TabsContent value="redeem">
          <div className="mt-4">
            <TokenRedemption 
              options={mockRedemptionOptions} 
              currentTokens={mockTokenStats.total} 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

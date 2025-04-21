
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, BookOpen, FileText, GraduationCap } from "lucide-react";
import { TokenRedemptionOption } from "../types/token-types";
import { toast } from "sonner";

interface TokenRedemptionProps {
  options: TokenRedemptionOption[];
  currentTokens: number;
}

export function TokenRedemption({ options, currentTokens }: TokenRedemptionProps) {
  const [redeeming, setRedeeming] = useState<number | null>(null);

  const getTypeIcon = (type: "course" | "content" | "ebook") => {
    switch (type) {
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      case "ebook":
        return <BookOpen className="h-4 w-4" />;
      case "content":
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleRedeem = (option: TokenRedemptionOption) => {
    if (currentTokens < option.tokenCost) {
      toast.error("You don't have enough tokens for this redemption");
      return;
    }

    setRedeeming(option.id);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Successfully redeemed: ${option.title}`);
      setRedeeming(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Redeem Your Tokens</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <Card key={option.id} className={`border ${currentTokens < option.tokenCost ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getTypeIcon(option.type)}
                  <CardTitle className="text-base">{option.title}</CardTitle>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  {option.tokenCost} <Coins className="ml-1 h-3.5 w-3.5" />
                </div>
              </div>
              <CardDescription className="text-xs mt-1">
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-2">
              {option.imageUrl && (
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img 
                    src={option.imageUrl} 
                    alt={option.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                size="sm" 
                className="w-full"
                disabled={currentTokens < option.tokenCost || redeeming === option.id}
                onClick={() => handleRedeem(option)}
              >
                {redeeming === option.id ? (
                  "Processing..."
                ) : (
                  <>Redeem</>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

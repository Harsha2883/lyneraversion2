
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TokenConfig, TokenEarningsRule } from './types/token-types';

export function TokenManagementTab() {
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    baseTokens: 10,
    performanceBonusTokens: 5,
    minScorePercentage: 70,
    highScoreThreshold: 90
  });

  const [earningRules, setEarningRules] = useState<TokenEarningsRule[]>([
    {
      achievementType: 'completion',
      tokensAwarded: 10,
      description: 'Tokens awarded for completing the course'
    },
    {
      achievementType: 'high_score',
      tokensAwarded: 20,
      description: 'Bonus tokens for scoring above high score threshold'
    }
  ]);

  const handleTokenConfigChange = (key: keyof TokenConfig, value: number) => {
    setTokenConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveTokenConfig = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to save token configurations");
        return;
      }

      const { error } = await supabase
        .from('course_token_configs')
        .insert({
          creator_id: user.id,
          course_id: 'TODO_REPLACE_WITH_CURRENT_COURSE_ID', // Replace with actual course ID
          base_tokens: tokenConfig.baseTokens,
          performance_bonus_tokens: tokenConfig.performanceBonusTokens,
          min_score_percentage: tokenConfig.minScorePercentage,
          high_score_threshold: tokenConfig.highScoreThreshold
        });

      if (error) throw error;

      // Save earning rules
      const ruleInserts = earningRules.map(rule => ({
        course_id: 'TODO_REPLACE_WITH_CURRENT_COURSE_ID', // Replace with actual course ID
        created_by: user.id,
        achievement_type: rule.achievementType,
        tokens_awarded: rule.tokensAwarded,
        description: rule.description
      }));

      const { error: ruleError } = await supabase
        .from('token_earnings_rules')
        .insert(ruleInserts);

      if (ruleError) throw ruleError;

      toast.success("Token configurations saved successfully!");
    } catch (error) {
      console.error('Error saving token configurations:', error);
      toast.error("Failed to save token configurations");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Base Tokens</Label>
              <Input 
                type="number" 
                value={tokenConfig.baseTokens}
                onChange={(e) => handleTokenConfigChange('baseTokens', Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Performance Bonus Tokens</Label>
              <Input 
                type="number" 
                value={tokenConfig.performanceBonusTokens}
                onChange={(e) => handleTokenConfigChange('performanceBonusTokens', Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Minimum Score Percentage for Tokens</Label>
              <Input 
                type="number" 
                value={tokenConfig.minScorePercentage}
                onChange={(e) => handleTokenConfigChange('minScorePercentage', Number(e.target.value))}
              />
            </div>
            <div>
              <Label>High Score Threshold</Label>
              <Input 
                type="number" 
                value={tokenConfig.highScoreThreshold}
                onChange={(e) => handleTokenConfigChange('highScoreThreshold', Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Earnings Rules</CardTitle>
        </CardHeader>
        <CardContent>
          {earningRules.map((rule, index) => (
            <div key={index} className="space-y-2 mb-4">
              <Label>Achievement Type</Label>
              <Input 
                type="text" 
                value={rule.achievementType} 
                readOnly 
              />
              <Label>Tokens Awarded</Label>
              <Input 
                type="number" 
                value={rule.tokensAwarded}
                onChange={(e) => {
                  const newRules = [...earningRules];
                  newRules[index].tokensAwarded = Number(e.target.value);
                  setEarningRules(newRules);
                }}
              />
              <Label>Description</Label>
              <Input 
                type="text" 
                value={rule.description}
                onChange={(e) => {
                  const newRules = [...earningRules];
                  newRules[index].description = e.target.value;
                  setEarningRules(newRules);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSaveTokenConfig}>
        Save Token Configuration
      </Button>
    </div>
  );
}

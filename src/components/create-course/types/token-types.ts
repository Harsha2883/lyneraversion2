
export interface TokenConfig {
  baseTokens: number;
  performanceBonusTokens: number;
  minScorePercentage: number;
  highScoreThreshold: number;
}

export interface TokenEarningsRule {
  achievementType: 'completion' | 'high_score' | 'first_attempt' | 'participation';
  tokensAwarded: number;
  description: string;
  conditions?: Record<string, any>;
}

// Interface for token issuance data
export interface TokenIssuance {
  id: string;
  userId: string;
  courseId: string;
  tokensEarned: number;
  assessmentScore?: number;
  issuedAt: string;
  achievementType: string;
}

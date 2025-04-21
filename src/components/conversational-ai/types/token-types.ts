
export interface TokenEntry {
  id: number;
  description: string;
  amount: number;
  date: string;
  source: TokenSource;
  courseId?: number;
  creatorId?: string;
}

export type TokenSource = 
  | "course_completion" 
  | "assessment_success" 
  | "top_performance" 
  | "participation";

export interface TokenRedemptionOption {
  id: number;
  title: string;
  description: string;
  tokenCost: number;
  type: "course" | "content" | "ebook";
  creatorId: string;
  imageUrl?: string;
}

export interface TokenStats {
  total: number;
  rank: string;
  nextRankTokens: number;
  nextRank: string;
}

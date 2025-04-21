
export interface Assessment {
  id: number;
  title: string;
  description: string;
  status: "completed" | "incomplete" | "in-progress";
  attemptsUsed: number;
  maxAttempts: number;
  passScore: number;
  tokenReward: number; // Added token reward
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  type: "objective" | "subjective";
  options?: string[];
  correctAnswer?: number;
}


export type AssessmentStatus = "completed" | "incomplete" | "in-progress";
export type AssessmentType = "objective" | "subjective";
export type AssessmentMode = "write" | "voice";

export interface Question {
  id: number;
  text: string;
  type: AssessmentType;
  options?: string[];
  correctAnswer?: string | number;
}

export interface Assessment {
  id: number;
  title: string;
  description: string;
  status: AssessmentStatus;
  attemptsUsed: number;
  maxAttempts: number;
  questions: Question[];
  passScore: number;
}

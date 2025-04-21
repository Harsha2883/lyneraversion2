
export interface Assessment {
  id: number;
  title: string;
  description: string;
  status: "completed" | "incomplete" | "in-progress";
  attemptsUsed: number;
  maxAttempts: number;
  passScore: number;
  tokenReward: number;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  type: "objective" | "subjective";
  options?: string[];
  correctAnswer?: number;
}

export interface AssessmentCardProps {
  assessment: Assessment;
  onSelect: (assessment: Assessment) => void;
}

export interface AssessmentListProps {
  assessments: Assessment[];
  onSelectAssessment: (assessment: Assessment) => void;
}

export interface AssessmentModeSelectorProps {
  selectedMode: AssessmentMode;
  onModeChange: (mode: AssessmentMode) => void;
}

export type AssessmentMode = "written" | "voice";

export interface WrittenAssessmentProps {
  assessment: Assessment;
  onComplete: (results: AssessmentResult) => void;
  onCancel: () => void;
}

export interface VoiceAssessmentProps {
  assessment: Assessment;
  onComplete: (results: AssessmentResult) => void;
  onCancel: () => void;
}

export interface AssessmentResult {
  assessmentId: number;
  score: number;
  completedAt: Date;
  answers: Answer[];
  tokensEarned: number;
}

export interface Answer {
  questionId: number;
  answer: string | number;
  isCorrect?: boolean;
}

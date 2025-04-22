
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
  onModeSelect: (mode: AssessmentMode) => void;
  onBack: () => void;
  title: string;
}

export type AssessmentMode = "write" | "voice";

export interface WrittenAssessmentProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  answer: string | number;
  onAnswerChange: (questionId: number, answer: string | number) => void;
  onBack: () => void;
  onSubmit: () => void;
  title: string;
}

export interface VoiceAssessmentProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  answer: string | number;
  isPlaying: boolean;
  isRecording: boolean;
  editingAnswer: boolean;
  onAnswerChange: (questionId: number, answer: string | number) => void;
  onBack: () => void;
  onTogglePlayback: () => void;
  onToggleRecording: () => void;
  onSubmit: () => void;
  title: string;
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

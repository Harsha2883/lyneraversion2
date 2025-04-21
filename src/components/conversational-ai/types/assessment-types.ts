
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

// New interfaces for component props
export interface AssessmentListProps {
  assessments: Assessment[];
  onSelectAssessment: (assessment: Assessment) => void;
}

export interface AssessmentModeSelectorProps {
  onModeSelect: (mode: AssessmentMode) => void;
  onBack: () => void;
  title: string;
}

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

export interface AssessmentCardProps {
  assessment: Assessment;
  onSelect: (assessment: Assessment) => void;
}

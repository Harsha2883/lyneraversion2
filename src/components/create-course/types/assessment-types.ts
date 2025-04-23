
export type QuestionType = "objective" | "subjective";

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface AssessmentQuestion {
  id: number;
  type: QuestionType;
  question: string;
  questionAudio?: string; // Placeholder for audio data URL for now
  options?: Option[];
  allowMultiple?: boolean;
  answer?: string; // For subjective (model answer)
  answerDocumentUrl?: string;
}

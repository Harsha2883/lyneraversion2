
export interface Submission {
  id: number;
  studentId: string;
  courseName: string;
  learnerName: string;
  submittedAt: string;
  questions: number;
  objectiveScore: number;
  objectiveMax: number;
  subjectiveScore: number | null;
  subjectiveReviewed: boolean;
  subjectiveAnswer?: string;
}

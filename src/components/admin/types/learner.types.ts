
export interface Learner {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  status: "active" | "inactive";
  joinedDate: string;
  lastActive: string;
  progress: number;
  avatar?: string;
  payments?: Payment[];
  tokens?: number;
  certificates?: Certificate[];
  assessments?: Assessment[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "refunded";
  method: string;
  courseId?: string;
  courseName?: string;
}

export interface Certificate {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseName: string;
  score: number;
  maxScore: number;
  date: string;
  status: "passed" | "failed";
  attempts: number;
}

export interface LearnerFilters {
  search: string;
  status: string;
}

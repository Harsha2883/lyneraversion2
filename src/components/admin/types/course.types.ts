
export interface Course {
  id: string;
  title: string;
  creatorName: string;
  creatorEmail: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  category: string;
  earnings: number;
  enrollments: number;
  completions: number;
  createdAt?: string;
  description?: string;
  price?: number;
  rating?: number;
  thumbnail?: string;
}

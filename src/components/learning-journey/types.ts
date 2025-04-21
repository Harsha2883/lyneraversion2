
export interface CourseHistoryItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "not-started";
  duration: string;
  enrollmentDate?: string;
  completionDate?: string;
  score?: number;
}

export interface LearningCurveData {
  date: string;
  score: number;
  courseId: string;
  courseName: string;
}

export interface SkillComparisonData {
  skills: {
    name: string;
    userScore: number;
    industryAverage: number;
  }[];
  strengths: string[];
  areasToImprove: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    image: string;
  };
  categoryBadge: string;
  duration: string;
  matchScore?: number;
}

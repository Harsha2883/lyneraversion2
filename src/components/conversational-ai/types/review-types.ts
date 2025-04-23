
export interface CourseReview {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  reviewer_id: string;
  course_id: string;
  creator_id: string;
  is_public: boolean;
}

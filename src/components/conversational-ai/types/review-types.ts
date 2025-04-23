
export interface CourseReview {
  id: string;
  course_id: string;
  reviewer_id: string;
  creator_id: string;
  rating: number;
  review_text: string;
  created_at?: string;
  is_public: boolean;
}

export interface ReviewFormData {
  rating: number;
  reviewText: string;
  isPublic: boolean;
}

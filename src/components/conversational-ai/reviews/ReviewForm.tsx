
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/profile/reviews/StarRating";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CourseReview } from "../types/review-types";

interface ReviewFormProps {
  onSubmit: (reviewData: Omit<CourseReview, 'id'>) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating before submitting");
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to submit a review");
        return;
      }
      
      // Replace this with the actual course ID and creator ID when integrated with real course data
      const courseId = "sample-course-id";
      const creatorId = "sample-creator-id";
      
      // Create the review data
      const reviewData = {
        course_id: courseId,
        reviewer_id: user.id,
        creator_id: creatorId,
        rating,
        review_text: reviewText,
        is_public: isPublic
      };
      
      await onSubmit(reviewData as unknown as Omit<CourseReview, 'id'>);
      
    } catch (error) {
      console.error('Error in review form submit:', error);
      alert("There was an error submitting your review");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Rate this course</h3>
        <StarRating 
          rating={rating}
          onChange={setRating}
          size="large"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Write your review</h3>
        <Textarea
          placeholder="Share your experience with this course..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          rows={5}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="public-review" 
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label htmlFor="public-review">Make this review public</Label>
      </div>
      
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}

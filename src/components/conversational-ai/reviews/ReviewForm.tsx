
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/profile/reviews/StarRating";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CourseReview {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

interface ReviewFormProps {
  courseId: string;
  creatorId: string;
  existingReview: CourseReview | null;
  onReviewSubmitted: () => void;
}

export function ReviewForm({ courseId, creatorId, existingReview, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [review, setReview] = useState(existingReview?.review_text || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(!existingReview);

  const handleSubmitReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        course_id: courseId,
        reviewer_id: (await supabase.auth.getUser()).data.user?.id,
        creator_id: creatorId,
        rating,
        review_text: review.trim() || null,
        is_public: true
      };

      if (existingReview) {
        const { error } = await supabase
          .from('course_reviews')
          .update(reviewData)
          .eq('id', existingReview.id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('course_reviews')
          .insert([reviewData]);
          
        if (error) throw error;
      }

      toast.success(existingReview ? "Review updated successfully" : "Review submitted successfully");
      onReviewSubmitted();
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEditing && existingReview) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Your Rating</label>
          <StarRating rating={existingReview.rating} readonly size="lg" />
        </div>
        {existingReview.review_text && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Your Review</label>
            <p className="text-sm text-muted-foreground">{existingReview.review_text}</p>
          </div>
        )}
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit Review
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Your Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} size="lg" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Your Review</label>
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          className="min-h-[100px]"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSubmitReview} disabled={isSubmitting}>
          {existingReview ? "Update Review" : "Submit Review"}
        </Button>
        {isEditing && existingReview && (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

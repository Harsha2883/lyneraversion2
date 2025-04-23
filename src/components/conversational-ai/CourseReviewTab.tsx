
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/profile/reviews/StarRating";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Facebook, Twitter, Mail, Share } from "lucide-react";
import { toast } from "sonner";

interface CourseReview {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

interface CourseReviewTabProps {
  courseId: string;
  creatorId: string;
}

export function CourseReviewTab({ courseId, creatorId }: CourseReviewTabProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [existingReview, setExistingReview] = useState<CourseReview | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      loadExistingReview();
    }
  }, [user, courseId]);

  const loadExistingReview = async () => {
    try {
      const { data, error } = await supabase
        .from('course_reviews')
        .select('*')
        .eq('course_id', courseId)
        .eq('reviewer_id', user?.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setExistingReview(data);
        setRating(data.rating);
        setReview(data.review_text || "");
      }
    } catch (error) {
      console.error('Error loading review:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please sign in to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        course_id: courseId,
        reviewer_id: user.id,
        creator_id: creatorId,
        rating,
        review_text: review.trim() || null,
        is_public: true
      };

      const { error } = existingReview
        ? await supabase
            .from('course_reviews')
            .update(reviewData)
            .eq('id', existingReview.id)
        : await supabase
            .from('course_reviews')
            .insert([reviewData]);

      if (error) throw error;

      toast.success(existingReview ? "Review updated successfully" : "Review submitted successfully");
      loadExistingReview();
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this course!`;

  const handleShare = (platform: string) => {
    let shareUrl;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(window.location.href)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: shareText,
            url: window.location.href
          });
          return;
        }
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(!existingReview || isEditing) ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Your Rating</label>
              <StarRating 
                rating={rating} 
                onRatingChange={setRating}
                size="lg"
              />
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
              <Button 
                onClick={handleSubmitReview} 
                disabled={isSubmitting}
              >
                {existingReview ? "Update Review" : "Submit Review"}
              </Button>
              {isEditing && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Your Rating</label>
              <StarRating 
                rating={existingReview.rating} 
                readonly
                size="lg"
              />
            </div>
            {existingReview.review_text && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Your Review</label>
                <p className="text-sm text-muted-foreground">{existingReview.review_text}</p>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
            >
              Edit Review
            </Button>
          </div>
        )}

        <div className="border-t pt-4 mt-6">
          <label className="text-sm font-medium mb-2 block">Share this course</label>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('email')}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleShare('native')}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

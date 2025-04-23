
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewForm } from "./reviews/ReviewForm";
import { ShareButtons } from "./reviews/ShareButtons";
import { RatingStatistics } from "./reviews/RatingStatistics";
import { CourseReviewsList } from "./reviews/CourseReviewsList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CourseReview, ReviewFormData } from "./types/review-types";

interface CourseReviewTabProps {
  courseId: string;
  creatorId: string;
}

export function CourseReviewTab({ courseId, creatorId }: CourseReviewTabProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const mockReviews: CourseReview[] = [
      {
        id: "1",
        course_id: courseId,
        reviewer_id: "user-123",
        creator_id: creatorId,
        rating: 5,
        review_text: "Excellent course with great content!",
        created_at: new Date().toISOString(),
        is_public: true
      },
      {
        id: "2",
        course_id: courseId,
        reviewer_id: "user-456",
        creator_id: creatorId,
        rating: 4,
        review_text: "Very informative and well-structured.",
        created_at: new Date().toISOString(),
        is_public: true
      }
    ];
    
    setReviews(mockReviews);
    
    if (mockReviews.length) {
      const total = mockReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(Math.round((total / mockReviews.length) * 10) / 10);
    }
    
    setUserHasReviewed(false);
    setIsLoading(false);
  }, [courseId, creatorId]);

  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to submit a review");
        return;
      }

      toast.success("Your review has been submitted");
      setShowReviewForm(false);
      
      const newReview: CourseReview = {
        id: `mock-${Date.now()}`,
        course_id: courseId,
        reviewer_id: user.id,
        creator_id: creatorId,
        rating: reviewData.rating,
        review_text: reviewData.reviewText,
        created_at: new Date().toISOString(),
        is_public: reviewData.isPublic
      };
      
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setUserHasReviewed(true);
      
      const total = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(Math.round((total / updatedReviews.length) * 10) / 10);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <RatingStatistics 
            reviews={reviews} 
            averageRating={averageRating} 
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Share This Course</CardTitle>
              <CardDescription>Help others discover this course</CardDescription>
            </CardHeader>
            <CardContent>
              <ShareButtons shareText="Check out this awesome course!" shareUrl={`https://example.com/course/${courseId}`} />
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            {!userHasReviewed ? (
              <Button 
                size="lg" 
                onClick={() => setShowReviewForm(true)}
                disabled={showReviewForm}
              >
                Write a Review
              </Button>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>You've already reviewed this course. Thank you for your feedback!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-4">
          {showReviewForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>Share your experience with this course</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm
                  onSubmitReview={handleSubmitReview}
                  onCancel={() => setShowReviewForm(false)}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reviews.length === 0 && !isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                  {!userHasReviewed && (
                    <Button
                      className="mt-4"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write a Review
                    </Button>
                  )}
                </div>
              ) : (
                <CourseReviewsList reviews={reviews} />
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

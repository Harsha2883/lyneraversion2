
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewForm } from "./reviews/ReviewForm";
import { ShareButtons } from "./reviews/ShareButtons";
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
    fetchReviews();
    checkUserReview();
  }, [courseId]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("course_reviews")
        .select("*")
        .eq("course_id", courseId)
        .eq("is_public", true);

      if (error) throw error;
      
      const reviewsData = data as unknown as CourseReview[];
      setReviews(reviewsData || []);
      
      // Calculate average rating
      if (reviewsData && reviewsData.length) {
        const total = reviewsData.reduce((sum, review) => sum + review.rating, 0);
        setAverageRating(Math.round((total / reviewsData.length) * 10) / 10);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserReview = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("course_reviews")
        .select("*")
        .eq("course_id", courseId)
        .eq("reviewer_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      setUserHasReviewed(!!data);
    } catch (error) {
      console.error("Error checking user review:", error);
    }
  };

  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to submit a review");
        return;
      }

      const review = {
        course_id: courseId,
        reviewer_id: user.id,
        creator_id: creatorId,
        rating: reviewData.rating,
        review_text: reviewData.reviewText,
        is_public: reviewData.isPublic
      };

      const { error } = await supabase.from("course_reviews").insert(review);

      if (error) throw error;
      
      setShowReviewForm(false);
      fetchReviews();
      checkUserReview();
      toast.success("Your review has been submitted");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
      throw error;
    }
  };

  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Rating</CardTitle>
              <CardDescription>Average rating from all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="text-4xl font-bold mr-2">{averageRating}</div>
                <div className="text-muted-foreground">out of 5</div>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center">
                    <div className="w-12">{rating} stars</div>
                    <div className="flex-1 mx-2 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ 
                          width: `${reviews.length ? (ratingDistribution[rating] || 0) / reviews.length * 100 : 0}%` 
                        }} 
                      />
                    </div>
                    <div className="w-12 text-right text-muted-foreground text-sm">
                      {ratingDistribution[rating] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
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
                <>
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-sm">User {review.reviewer_id.substring(0, 8)}</CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.created_at || "").toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{review.review_text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CourseReview } from "./types/review-types";
import { ReviewForm } from "./reviews/ReviewForm";
import { ShareButtons } from "./reviews/ShareButtons";
import { toast } from "sonner";

export function CourseReviewTab() {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  useEffect(() => {
    // Check if user already submitted review
    const checkExistingReview = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        // Add type assertion to avoid TypeScript errors
        const { data: existingReviews } = await (supabase
          .from('course_reviews' as any)
          .select('*')
          .eq('reviewer_id', user.id) as any);

        if (existingReviews && existingReviews.length > 0) {
          setSubmittedReview(true);
          setReviews(existingReviews as unknown as CourseReview[]);
        }
      } catch (error) {
        console.error('Error checking existing reviews:', error);
      }
    };
    
    checkExistingReview();
  }, []);

  const handleReviewSubmit = async (reviewData: Omit<CourseReview, 'id'>) => {
    setIsSubmitting(true);
    try {
      // Add type assertion to avoid TypeScript errors
      const { data, error } = await (supabase
        .from('course_reviews' as any)
        .insert([reviewData]) as any);
        
      if (error) throw error;
      toast.success("Review submitted successfully!");
      setSubmittedReview(true);
      
      // Refresh reviews
      const { data: updatedReviews } = await (supabase
        .from('course_reviews' as any)
        .select('*')
        .eq('reviewer_id', reviewData.reviewer_id) as any);
        
      setReviews(updatedReviews as unknown as CourseReview[]);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="write">Write Review</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="space-y-4 mt-4">
          {submittedReview ? (
            <div className="text-center space-y-4 py-8">
              <h3 className="text-xl font-medium">Thank You For Your Review!</h3>
              <p className="text-muted-foreground">Your feedback helps improve our courses.</p>
              <Button onClick={() => setActiveTab('share')}>
                Share This Course
              </Button>
            </div>
          ) : (
            <ReviewForm 
              onSubmit={handleReviewSubmit} 
              isSubmitting={isSubmitting} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="share" className="mt-4">
          <ShareButtons />
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ReviewForm } from "./reviews/ReviewForm";
import { ShareButtons } from "./reviews/ShareButtons";
import { CourseReview } from "./types/review-types";

interface CourseReviewTabProps {
  courseId: string;
  creatorId: string;
}

export function CourseReviewTab({ courseId, creatorId }: CourseReviewTabProps) {
  const { user } = useAuth();
  const [existingReview, setExistingReview] = useState<CourseReview | null>(null);

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
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setExistingReview(data as unknown as CourseReview);
      }
    } catch (error) {
      console.error('Error loading review:', error);
      toast.error("Failed to load review");
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Review</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please sign in to submit a review.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReviewForm
          courseId={courseId}
          creatorId={creatorId}
          existingReview={existingReview}
          onReviewSubmitted={loadExistingReview}
        />

        <div className="border-t pt-4 mt-6">
          <ShareButtons
            shareText="Check out this course!"
            shareUrl={window.location.href}
          />
        </div>
      </CardContent>
    </Card>
  );
}

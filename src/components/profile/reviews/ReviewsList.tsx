
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  reviewer_id: string;
  is_public: boolean;
  created_at: string;
  reviewer?: {
    first_name: string;
    last_name: string;
  };
}

interface ReviewsListProps {
  creatorId: string;
  isOwnProfile?: boolean;
}

export function ReviewsList({ creatorId, isOwnProfile }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [creatorId]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_reviews')
        .select(`
          id,
          rating,
          review_text,
          reviewer_id,
          is_public,
          created_at,
          reviewer:profiles!reviewer_id(first_name, last_name)
        `)
        .eq('creator_id', creatorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReviewVisibility = async (reviewId: string, isPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('creator_reviews')
        .update({ is_public: isPublic })
        .eq('id', reviewId);

      if (error) throw error;
      await loadReviews();
    } catch (error) {
      console.error('Error updating review visibility:', error);
    }
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating} readonly size="sm" />
                  <span className="text-sm text-muted-foreground">
                    by {review.reviewer?.first_name} {review.reviewer?.last_name}
                  </span>
                </div>
                <p className="text-sm">{review.review_text}</p>
              </div>
              {isOwnProfile && (
                <div className="flex items-center gap-2">
                  <Switch
                    id={`visibility-${review.id}`}
                    checked={review.is_public}
                    onCheckedChange={(checked) => 
                      toggleReviewVisibility(review.id, checked)
                    }
                  />
                  <Label htmlFor={`visibility-${review.id}`}>Public</Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}



import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './StarRating';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  review_text: string;
  reviewer_id: string;
  reviewer_name?: string;
  created_at: string;
}

interface ReviewsListProps {
  userId: string;
  maxReviews?: number;
}

export function ReviewsList({ userId, maxReviews = 3 }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        // Use type assertion to avoid TypeScript errors
        const { data, error } = await (supabase
          .from('creator_reviews' as any)
          .select('*')
          .eq('creator_id', userId)
          .limit(maxReviews) as any);
          
        if (error) throw error;

        // Add reviewer names
        let reviewsWithNames: Review[] = [];
        if (data) {
          reviewsWithNames = data.map((review: any) => ({
            ...review,
            reviewer_name: 'Anonymous User'  // Default name
          }));
          
          // Try to load reviewer names
          for (const review of reviewsWithNames) {
            try {
              const { data: profileData } = await (supabase
                .from('profiles')
                .select('first_name, last_name')
                .eq('id', review.reviewer_id)
                .single());
                
              if (profileData) {
                review.reviewer_name = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Anonymous User';
              }
            } catch (err) {
              console.error('Error fetching reviewer profile:', err);
            }
          }
        }
        
        setReviews(reviewsWithNames);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [userId, maxReviews]);

  if (loading) {
    return <div className="py-8 text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No reviews yet</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{review.reviewer_name?.[0] || 'A'}</AvatarFallback>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.reviewer_name}`} />
                </Avatar>
                <div>
                  <div className="font-medium">{review.reviewer_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {review.created_at && formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <StarRating rating={review.rating} readOnly size="small" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{review.review_text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

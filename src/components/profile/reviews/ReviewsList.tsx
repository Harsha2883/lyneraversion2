
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { formatDistanceToNow } from 'date-fns';
import { CourseReview } from '@/components/conversational-ai/types/review-types';
import { ThumbsUp, MessageSquare, Flag } from 'lucide-react';

interface ReviewsListProps {
  reviews: CourseReview[];
  isLoading?: boolean;
}

export function ReviewsList({ reviews = [], isLoading = false }: ReviewsListProps) {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter reviews based on active tab
  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'positive') return review.rating >= 4;
    if (activeTab === 'neutral') return review.rating === 3;
    if (activeTab === 'critical') return review.rating <= 2;
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredReviews.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No reviews in this category</p>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReviewCard({ review }: { review: CourseReview }) {
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isHelpful, setIsHelpful] = useState(false);
  
  const handleHelpfulClick = () => {
    if (isHelpful) {
      setHelpfulCount(helpfulCount - 1);
    } else {
      setHelpfulCount(helpfulCount + 1);
    }
    setIsHelpful(!isHelpful);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.reviewer_id}`} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">User {review.reviewer_id.substring(0, 6)}...</CardTitle>
              <p className="text-xs text-muted-foreground">
                {review.created_at ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true }) : 'Recently'}
              </p>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.review_text}</p>
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs flex items-center gap-1 ${isHelpful ? 'text-primary' : ''}`}
            onClick={handleHelpfulClick}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Helpful {helpfulCount > 0 ? `(${helpfulCount})` : ''}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 ml-auto">
            <Flag className="h-3.5 w-3.5" />
            <span>Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

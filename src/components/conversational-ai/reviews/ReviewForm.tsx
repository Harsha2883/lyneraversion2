
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { ReviewFormData } from '../types/review-types';

interface ReviewFormProps {
  onSubmitReview: (reviewData: ReviewFormData) => Promise<void>;
  onCancel: () => void;
}

export function ReviewForm({ onSubmitReview, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      toast.error('Please write a review with at least 10 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmitReview({
        rating,
        reviewText,
        isPublic,
      });
      toast.success('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                size="lg"
                className={`h-8 w-8 transition-all ${
                  (hoverRating || rating) > i
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-text">Your Review</Label>
        <Textarea
          id="review-text"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="resize-none"
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
}

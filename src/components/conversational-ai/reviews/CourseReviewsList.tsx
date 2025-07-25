
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseReview } from "../types/review-types";

interface CourseReviewsListProps {
  reviews: CourseReview[];
}

export function CourseReviewsList({ reviews }: CourseReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-sm">
                  {review.reviewer_id ? `User ${review.reviewer_id.substring(0, 8)}` : 'Anonymous'}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Unknown date'}
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
    </div>
  );
}

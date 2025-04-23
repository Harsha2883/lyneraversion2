
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseReview } from "../types/review-types";

interface RatingStatisticsProps {
  reviews: CourseReview[];
  averageRating: number;
}

export function RatingStatistics({ reviews, averageRating }: RatingStatisticsProps) {
  // Create rating distribution object
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
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
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="w-12">{rating} stars</div>
              <div className="flex-1 mx-2 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full" 
                  style={{ 
                    width: `${reviews.length ? ((ratingDistribution[rating] || 0) / reviews.length * 100) : 0}%` 
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
  );
}

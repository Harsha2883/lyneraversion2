
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/profile/reviews/StarRating";
import { ShareButtons } from "@/components/conversational-ai/reviews/ShareButtons";
import { ReviewsList } from "@/components/profile/reviews/ReviewsList";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { MOCK_COURSES } from "@/components/marketplace/mock-data";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = MOCK_COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <LearnerDashboard>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </LearnerDashboard>
    );
  }

  return (
    <LearnerDashboard>
      <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={course.rating} readonly />
                  <span className="text-muted-foreground">({course.rating})</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Course Objective</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Learning Outcomes</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Understand key concepts and principles</li>
                    <li>Apply practical skills in real-world scenarios</li>
                    <li>Develop professional expertise</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Target Audience</h3>
                  <p className="text-muted-foreground">
                    Professionals seeking to enhance their knowledge and skills in {course.category}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Modules</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((module) => (
                      <Card key={module}>
                        <CardHeader>
                          <CardTitle className="text-base">Module {module}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewsList reviews={[]} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold">{course.price}</div>
                  {course.isForMembers && (
                    <Badge variant="secondary">Available for Members</Badge>
                  )}
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      {course.price === "Free" ? "Enroll Now" : "Buy Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <ShareButtons 
                  shareUrl={window.location.href} 
                  shareText={`Check out this course: ${course.title}`} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LearnerDashboard>
  );
}

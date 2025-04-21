
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseRecommendation } from "@/components/learning-journey/types";
import { CourseCard } from "@/components/course-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseRecommendationsProps {
  recommendations: {
    basedOnHistory: CourseRecommendation[];
    basedOnSkillGaps: CourseRecommendation[];
    trending: CourseRecommendation[];
  };
}

export function CourseRecommendations({ recommendations }: CourseRecommendationsProps) {
  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Course Recommendations</CardTitle>
          <CardDescription>
            Courses tailored to your learning history, skill gaps, and current trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="history">Based on History</TabsTrigger>
              <TabsTrigger value="skills">For Skill Gaps</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.basedOnHistory.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    creator={course.creator}
                    categoryBadge={course.categoryBadge}
                    duration={course.duration}
                  />
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  These recommendations are based on your learning history and preferences.
                  We analyzed the courses you've completed and identified similar content you might enjoy.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.basedOnSkillGaps.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    creator={course.creator}
                    categoryBadge={course.categoryBadge}
                    duration={course.duration}
                  />
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  These courses address skills where you have the biggest gaps compared to industry averages.
                  Taking these courses will help you become more competitive in the international market.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.trending.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    creator={course.creator}
                    categoryBadge={course.categoryBadge}
                    duration={course.duration}
                  />
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  These are the most popular courses in your field right now.
                  Many professionals with similar backgrounds are currently taking these courses.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

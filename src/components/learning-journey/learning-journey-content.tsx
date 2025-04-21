
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHistory } from "@/components/learning-journey/course-history";
import { LearningCurve } from "@/components/learning-journey/learning-curve";
import { SkillComparison } from "@/components/learning-journey/skill-comparison";
import { CourseRecommendations } from "@/components/learning-journey/course-recommendations";
import { mockCourseHistory, mockLearningCurveData, mockSkillComparisonData, mockRecommendedCourses } from "@/components/learning-journey/data/mock-learning-data";

export function LearningJourneyContent() {
  return (
    <div className="mt-6 space-y-6">
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="w-full border-b justify-start">
          <TabsTrigger value="history">Course History</TabsTrigger>
          <TabsTrigger value="curve">Learning Curve</TabsTrigger>
          <TabsTrigger value="skills">Skill Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <CourseHistory courses={mockCourseHistory} />
        </TabsContent>
        
        <TabsContent value="curve">
          <LearningCurve data={mockLearningCurveData} />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillComparison data={mockSkillComparisonData} />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <CourseRecommendations recommendations={mockRecommendedCourses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

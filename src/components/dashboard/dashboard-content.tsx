
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EnrolledCourses } from "@/components/dashboard/enrolled-courses";
import { CarbonFootprint } from "@/components/dashboard/carbon-footprint";
import { AssessmentProgress } from "@/components/dashboard/assessment-progress";
import { TokensEarned } from "@/components/dashboard/tokens-earned";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SkillsProgress } from "@/components/dashboard/skills-progress";
import { CourseRecommendations } from "@/components/dashboard/course-recommendations";
import { useAuth } from "@/hooks/useAuth";

export function DashboardContent() {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <DashboardHeader 
        title={`Welcome, ${profile?.first_name || 'Learner'}`} 
        description="Track your sustainability learning journey"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <EnrolledCourses />
        <CarbonFootprint />
        <AssessmentProgress />
        <TokensEarned />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentActivity />
        <SkillsProgress />
      </div>
      
      <div className="mt-6">
        <CourseRecommendations />
      </div>
    </div>
  );
}

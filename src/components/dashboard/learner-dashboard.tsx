
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { 
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  Library,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EnrolledCourses } from "@/components/dashboard/enrolled-courses";
import { CarbonFootprint } from "@/components/dashboard/carbon-footprint";
import { AssessmentProgress } from "@/components/dashboard/assessment-progress";
import { TokensEarned } from "@/components/dashboard/tokens-earned";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SkillsProgress } from "@/components/dashboard/skills-progress";
import { CourseRecommendations } from "@/components/dashboard/course-recommendations";

const sidebarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Conversational AI",
    href: "/dashboard/ai",
    icon: MessageSquare,
  },
  {
    title: "Learning Journey",
    href: "/dashboard/journey",
    icon: GraduationCap,
  },
  {
    title: "E-Library",
    href: "/dashboard/library",
    icon: Library,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  // Add logout nav item
  {
    title: "Logout",
    href: "#logout",
    icon: LogOut,
    isLogout: true // Custom prop to differentiate logout item
  }
];

export function LearnerDashboard() {
  const { signOut, profile } = useAuth();

  return (
    <div className="flex min-h-screen">
      <SidebarNav 
        items={sidebarNavItems} 
        onLogout={signOut}
      />
      <main className="flex-1 overflow-auto">
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
      </main>
    </div>
  );
}

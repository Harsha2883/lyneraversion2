
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { LayoutDashboard, PlusCircle, Book, Rocket, Library, Leaf, User, Settings, LogOut } from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CarbonFootprint } from "./carbon-footprint";
import { SkillsProgress } from "./skills-progress";
import { TokensDistributed } from "./tokens-distributed";
import { RecentCourses } from "./recent-courses";
import { SocialMediaHandles } from "./social-media-handles";
import { UpgradePlanCard } from "./upgrade-plan-card";
import { ReactNode } from "react";

const sidebarNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Create Course", href: "/dashboard/create-course", icon: PlusCircle },
  { title: "Courses Published", href: "/dashboard/courses-published", icon: Book },
  { title: "Creator Journey", href: "/dashboard/creator-journey", icon: Rocket },
  { title: "E-Library", href: "/dashboard/creator-e-library", icon: Library },
  { title: "Carbon footprint", href: "/dashboard/carbon", icon: Leaf },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Logout", href: "#logout", icon: LogOut, isLogout: true }
];

interface CreatorDashboardProps {
  children?: ReactNode;
}

export function CreatorDashboard({ children }: CreatorDashboardProps) {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-muted/50">
      <SidebarNav items={sidebarNavItems} onLogout={signOut} />
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        {children ? (
          children
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Creator Dashboard</h1>
              <Button asChild variant="default" className="gap-2">
                <a href="/dashboard/create-course">
                  <PlusCircle className="h-5 w-5" />
                  Create Course
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CarbonFootprint />
              <TokensDistributed />
              <RecentCourses />
              <SkillsProgress />
              <SocialMediaHandles />
              <UpgradePlanCard />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

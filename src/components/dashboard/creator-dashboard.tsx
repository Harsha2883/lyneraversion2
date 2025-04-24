
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { 
  PlusCircle, 
  Book, 
  Rocket, 
  Leaf, 
  User, 
  Settings, 
  LogOut, 
  Library, 
  BookOpen,
  Car,
  Plane,
  Smartphone
} from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CarbonFootprint } from "./carbon-footprint";
import { TokensDistributed } from "./tokens-distributed";
import { RecentCourses } from "./recent-courses";
import { SkillsProgress } from "./skills-progress";
import { SocialMediaHandles } from "./social-media-handles";
import { UpgradePlanCard } from "./upgrade-plan-card";
import { ReactNode } from "react";

const sidebarNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Rocket },
  { title: "Create Course", href: "/dashboard/create-course", icon: PlusCircle },
  { title: "Courses Published", href: "/dashboard/courses-published", icon: Book },
  { title: "Carbon footprint", href: "/dashboard/carbon", icon: Leaf },
  { title: "E-Library", href: "/dashboard/creator-e-library", icon: Library },
  { title: "Creator Journey", href: "/dashboard/creator-journey", icon: BookOpen },
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
      <main className="flex-1 p-6">
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
            
            <section className="bg-green-50/50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold">Your Sustainability Impact</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Summary of your environmental impact through sustainable learning
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total CO2 Saved</div>
                  <div className="text-2xl font-bold text-green-600">45.35kg</div>
                  <div className="text-xs text-muted-foreground">Compared to traditional in-person learning</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Water Saved</div>
                  <div className="text-2xl font-bold text-blue-600">285 L</div>
                  <div className="text-xs text-muted-foreground">By not traveling to physical classrooms</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Your CO2 Footprint</div>
                  <div className="text-2xl font-bold text-amber-600">1.35kg</div>
                  <div className="text-xs text-muted-foreground">Total from your online learning activities</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Efficiency Ratio</div>
                  <div className="text-2xl font-bold text-purple-600">97%</div>
                  <div className="text-xs text-muted-foreground">CO2 reduction compared to in-person learning</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <Car className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">378 km</div>
                    <div className="text-xs text-muted-foreground">Car travel avoided</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <Plane className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">504 km</div>
                    <div className="text-xs text-muted-foreground">Flight distance equivalent</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">3023 charges</div>
                    <div className="text-xs text-muted-foreground">Smartphone charges equivalent</div>
                  </div>
                </div>
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

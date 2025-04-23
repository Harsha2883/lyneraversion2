
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { 
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  Library,
  User,
  Settings,
  LogOut,
  Leaf,
  BookOpen  // Adding this import for the new "Explore Courses" icon
} from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LearnerDashboardProps {
  children: React.ReactNode;
}

const sidebarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Carbon Footprint",
    href: "/dashboard/carbon",
    icon: Leaf,
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
    title: "Explore Courses",
    href: "/marketplace",  // Added new navigation item
    icon: BookOpen,
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
  {
    title: "Logout",
    href: "#logout",
    icon: LogOut,
    isLogout: true
  }
];

export function LearnerDashboard({ children }: LearnerDashboardProps) {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen">
      <SidebarNav 
        items={sidebarNavItems} 
        onLogout={signOut}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

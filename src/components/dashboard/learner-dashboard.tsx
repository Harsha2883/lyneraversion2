
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { 
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  Library,
  User,
  Settings
} from "lucide-react";
import { NavItem } from "@/types/navigation";

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
];

export function LearnerDashboard() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav items={sidebarNavItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to your Learning Dashboard</h1>
      </main>
    </div>
  );
}


import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import {
  LayoutDashboard,
  PlusCircle,
  Compass,
  Library,
  User,
  Settings,
  LogOut // Add LogOut icon
} from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth

const sidebarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Course",
    href: "/dashboard/create-course",
    icon: PlusCircle,
  },
  {
    title: "Creator Journey",
    href: "/dashboard/creator-journey",
    icon: Compass,
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

export function CreatorDashboard() {
  const { signOut } = useAuth(); // Get signOut method

  return (
    <div className="flex min-h-screen">
      <SidebarNav 
        items={sidebarNavItems} 
        onLogout={signOut} // Pass signOut method
      />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to your Creator Dashboard</h1>
      </main>
    </div>
  );
}


import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import {
  LayoutDashboard,
  PlusCircle,
  Rocket,
  Library,
  Leaf,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuth";

// Updated sidebar nav items with correct icons and all required links
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
    icon: Rocket,
  },
  {
    title: "E-Library",
    href: "/dashboard/library",
    icon: Library,
  },
  {
    title: "Carbon footprint",
    href: "/dashboard/carbon",
    icon: Leaf,
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

export function CreatorDashboard() {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen">
      <SidebarNav 
        items={sidebarNavItems} 
        onLogout={signOut}
      />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to your Creator Dashboard</h1>
      </main>
    </div>
  );
}

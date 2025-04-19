
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Create Course",
    href: "/dashboard/create-course",
    icon: "PlusCircle",
  },
  {
    title: "Creator Journey",
    href: "/dashboard/creator-journey",
    icon: "Compass",
  },
  {
    title: "E-Library",
    href: "/dashboard/library",
    icon: "Library",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "User",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
];

export function CreatorDashboard() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav items={sidebarNavItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to your Creator Dashboard</h1>
      </main>
    </div>
  );
}

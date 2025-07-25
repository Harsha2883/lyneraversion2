
import { BarChart3, BookOpen, Settings, User, Users, Database, Coins } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { name: "Dashboard", icon: BarChart3, href: "/admin" },
  
  // Creator Management
  { name: "Creator Courses", icon: BookOpen, href: "/admin/creator-courses" },
  { name: "Creators", icon: User, href: "/admin/creators" },
  
  // Learner Management
  { name: "Learners", icon: Users, href: "/admin/learners" },
  { name: "Course Reviews", icon: BookOpen, href: "/admin/courses" },
  
  // System Management
  { name: "Internal System", icon: Database, href: "/admin/system" },
  { name: "Token Management", icon: Coins, href: "/admin/tokens" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];


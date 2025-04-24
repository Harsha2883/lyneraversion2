
import { BarChart3, BookOpen, Layers, Settings, Shield, User, Users, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { name: "Dashboard", icon: BarChart3, href: "/admin" },
  { name: "Creators", icon: User, href: "/admin/creators" },
  { name: "Learners", icon: Users, href: "/admin/learners" },
  { name: "Internal System", icon: Database, href: "/admin/system" },
  { name: "User Management", icon: Users, href: "/admin/users" },
  { name: "Creator Approvals", icon: User, href: "/admin/creator-approvals" },
  { name: "Course Reviews", icon: BookOpen, href: "/admin/courses" },
  { name: "Access Control", icon: Shield, href: "/admin/access" },
  { name: "Content Management", icon: Layers, href: "/admin/content" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

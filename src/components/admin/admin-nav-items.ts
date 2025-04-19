
import { BarChart3, BookOpen, Layers, Settings, Shield, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { name: "Dashboard", icon: BarChart3, href: "/admin" },
  { name: "User Management", icon: Users, href: "/admin/users" },
  { name: "Creator Approvals", icon: User, href: "/admin/creators" },
  { name: "Course Reviews", icon: BookOpen, href: "/admin/courses" },
  { name: "Access Control", icon: Shield, href: "/admin/access" },
  { name: "Content Management", icon: Layers, href: "/admin/content" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

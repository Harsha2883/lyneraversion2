
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isLogout?: boolean; // Optional flag to identify logout item
}

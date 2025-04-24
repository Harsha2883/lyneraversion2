import { NavItem } from "./nav-item";
import { Logo } from "@/components/ui/logo";
import { NavItem as NavItemType } from "@/types/navigation";
interface SidebarNavProps {
  items: NavItemType[];
  onLogout?: () => void; // Optional logout handler
}
export function SidebarNav({
  items,
  onLogout
}: SidebarNavProps) {
  return <nav className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <Logo />
        
      </div>
      <div className="flex-1 space-y-1 p-4">
        {items.map(item => <NavItem key={item.href} item={item} onLogout={onLogout} />)}
      </div>
    </nav>;
}

import { NavItem as NavItemType } from "@/types/navigation";
import { Logo } from "@/components/ui/logo";
import { NavItem } from "./nav-item";

interface SidebarNavProps {
  items: NavItemType[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex-1 space-y-1 p-4">
        {items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
    </nav>
  );
}


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "@/types/navigation";

interface NavItemProps {
  item: NavItem;
}

export function NavItem({ item }: NavItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  
  return (
    <Button
      key={item.href}
      variant={location.pathname === item.href ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-2",
        location.pathname === item.href && "bg-accent"
      )}
      asChild
    >
      <Link to={item.href}>
        <Icon className="h-4 w-4" />
        {item.title}
      </Link>
    </Button>
  );
}

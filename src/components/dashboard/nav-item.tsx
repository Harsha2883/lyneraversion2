
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "@/types/navigation";
import { toast } from "sonner";

interface NavItemProps {
  item: NavItem;
  onLogout?: () => void; // Optional logout handler
}

export function NavItem({ item, onLogout }: NavItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  
  const handleClick = async () => {
    // If it's a logout item and onLogout is provided
    if (item.isLogout && onLogout) {
      await onLogout();
      toast.success("Successfully logged out!");
    }
  };
  
  // If it's a logout item, don't use Link
  if (item.isLogout) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 hover:bg-destructive/10",
          "text-destructive hover:text-destructive"
        )}
        onClick={handleClick}
      >
        <Icon className="h-4 w-4" />
        {item.title}
      </Button>
    );
  }
  
  // Regular nav item rendering
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

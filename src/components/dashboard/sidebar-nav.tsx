
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface SidebarNavProps {
  items: {
    title: string;
    href: string;
    icon: keyof typeof Icons;
  }[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = Icons[item.icon];
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
        })}
      </div>
    </nav>
  );
}

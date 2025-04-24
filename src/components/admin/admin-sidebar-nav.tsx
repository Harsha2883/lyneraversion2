
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./admin-nav-items";

interface AdminSidebarNavProps {
  mobile?: boolean;
  onNavClick?: () => void;
  collapsed?: boolean;
}

export function AdminSidebarNav({ mobile, onNavClick, collapsed = false }: AdminSidebarNavProps) {
  const location = useLocation();

  const isRouteActive = (href: string) => {
    if (href === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(href) && href !== '/admin';
  };

  return (
    <div className={mobile ? "mt-6 space-y-1" : "p-4 space-y-1"}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary ${
            isRouteActive(item.href) ? 'bg-secondary' : ''
          }`}
          onClick={onNavClick}
          title={collapsed ? item.name : undefined}
        >
          <item.icon className="h-4 w-4" />
          {!collapsed && <span>{item.name}</span>}
        </Link>
      ))}
    </div>
  );
}

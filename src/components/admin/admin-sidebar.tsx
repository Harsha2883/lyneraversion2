
import { AdminSidebarNav } from "./admin-sidebar-nav";

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-background hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      <AdminSidebarNav />
    </aside>
  );
}

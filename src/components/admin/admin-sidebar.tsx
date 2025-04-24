
import { AdminSidebarNav } from "./admin-sidebar-nav";
import { useSidebar } from "@/components/ui/sidebar";

export function AdminSidebar() {
  const { open } = useSidebar();
  
  return (
    <aside className={`border-r bg-background hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto transition-all duration-300 ${open ? 'w-64' : 'w-16'}`}>
      <AdminSidebarNav collapsed={!open} />
    </aside>
  );
}

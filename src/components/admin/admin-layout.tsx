
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-secondary/20 w-full">
        <AdminHeader />
        <div className="flex-1 flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

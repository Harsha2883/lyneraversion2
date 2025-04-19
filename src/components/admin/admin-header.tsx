
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { UserNav } from "@/components/user-nav";
import { AdminSidebarNav } from "./admin-sidebar-nav";

export function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <Logo />
                <AdminSidebarNav mobile onNavClick={() => setSidebarOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
            Admin
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search..." 
            className="w-64 hidden md:flex h-9"
          />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

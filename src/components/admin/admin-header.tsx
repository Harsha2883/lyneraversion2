
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bell, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { UserNav } from "@/components/user-nav";
import { AdminSidebarNav } from "./admin-sidebar-nav";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

export function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <div className="flex items-center gap-2 mb-6">
                  <Logo />
                  <Badge className="bg-red-500 text-white">Master Admin</Badge>
                </div>
                <AdminSidebarNav mobile onNavClick={() => setSidebarOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/admin" className="flex items-center gap-2">
            <Logo />
            <Badge className="bg-red-500 text-white hidden sm:flex">Master Admin</Badge>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Search..." 
            className="w-64 hidden md:flex h-9"
          />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}

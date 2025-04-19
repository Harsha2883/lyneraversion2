
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/ui/logo";
import { BarChart3, BookOpen, LucideIcon, Settings, Shield, User, Users, Layers, LogOut, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Dashboard", icon: BarChart3, href: "#" },
  { name: "User Management", icon: Users, href: "#" },
  { name: "Creator Approvals", icon: User, href: "#" },
  { name: "Course Reviews", icon: BookOpen, href: "#" },
  { name: "Access Control", icon: Shield, href: "#" },
  { name: "Content Management", icon: Layers, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      {/* Header */}
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
                  <div className="mt-6 space-y-1">
                    {navItems.map((item) => (
                      <a 
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </a>
                    ))}
                  </div>
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
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r bg-background hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,543</div>
                  <p className="text-xs text-muted-foreground">+156 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254</div>
                  <p className="text-xs text-muted-foreground">+12 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">Needs review</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">98.5%</div>
                  <p className="text-xs text-muted-foreground">Optimal</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Different Admin Sections */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="courses">Course Management</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Team Access</CardTitle>
                    <CardDescription>
                      Manage access levels for your team of 10 administrators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg">
                        <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted">
                          <div>Administrator</div>
                          <div>Role</div>
                          <div>Last Active</div>
                          <div>Actions</div>
                        </div>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">Admin {i + 1}</div>
                                <div className="text-xs text-muted-foreground">admin{i + 1}@lynera.ai</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-accent/20 text-accent-foreground text-xs px-2 py-1 rounded-full">
                                {i === 0 ? "Super Admin" : i === 1 ? "Content Manager" : i === 2 ? "User Manager" : i === 3 ? "Creator Approver" : "Read Only"}
                              </div>
                            </div>
                            <div className="flex items-center text-sm">
                              {i === 0 ? "Just now" : i === 1 ? "2 hours ago" : i === 2 ? "Yesterday" : i === 3 ? "3 days ago" : "1 week ago"}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Manage</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button>Add Admin</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts, roles, and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      User management content would go here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>
                      Manage and moderate course content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Course management content would go here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics & Reports</CardTitle>
                    <CardDescription>
                      View platform analytics and generate reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Reports and analytics content would go here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Shield, Plus, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { SystemUser, UserRole } from "../types/system.types";

// Mock data for system users
const mockSystemUsers: SystemUser[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", status: "active", createdAt: "2023-05-15", lastActive: "2024-04-24" },
  { id: "2", name: "Moderator One", email: "mod1@example.com", role: "moderator", status: "active", createdAt: "2023-08-22", lastActive: "2024-04-23" },
  { id: "3", name: "Moderator Two", email: "mod2@example.com", role: "moderator", status: "inactive", createdAt: "2023-11-10", lastActive: "2024-03-15" },
  { id: "4", name: "Creator User", email: "creator@example.com", role: "creator", status: "active", createdAt: "2024-01-18", lastActive: "2024-04-20" },
  { id: "5", name: "Learner User", email: "learner@example.com", role: "learner", status: "active", createdAt: "2024-02-05", lastActive: "2024-04-22" },
  { id: "6", name: "Suspended User", email: "suspended@example.com", role: "learner", status: "suspended", createdAt: "2023-09-30", lastActive: "2024-03-10" },
];

export function SystemUsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  
  const filteredUsers = mockSystemUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("User added successfully");
    setIsAddUserDialogOpen(false);
  };
  
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API endpoint
    toast.success("User deleted successfully");
  };

  return (
    <Card className="flex-1">
      <div className="p-6 space-y-6">
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-1 sm:grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">User Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Button onClick={() => setIsAddUserDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <Input 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No users found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.role === "admin" ? "default" : 
                              user.role === "moderator" ? "secondary" : "outline"
                            }
                            className="capitalize"
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.status === "active" ? "default" : 
                              user.status === "inactive" ? "outline" : "destructive"
                            }
                            className="capitalize"
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "Never"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.role === "admin"}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">User Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                <h4 className="font-medium mb-2">Default User Preferences</h4>
                <p className="text-sm text-muted-foreground">Configure default settings for new users</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                <h4 className="font-medium mb-2">Password Policy</h4>
                <p className="text-sm text-muted-foreground">Configure password requirements and expiration</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                <h4 className="font-medium mb-2">User Activity Monitoring</h4>
                <p className="text-sm text-muted-foreground">Configure user activity tracking settings</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Add User Dialog */}
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with specified role and permissions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="learner">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendInvite" defaultChecked />
                  <Label htmlFor="sendInvite">Send invitation email</Label>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

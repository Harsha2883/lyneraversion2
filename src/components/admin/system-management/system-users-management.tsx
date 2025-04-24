
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  User, 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Check, 
  X 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type UserRole = "admin" | "moderator" | "creator" | "learner";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  group: "content" | "users" | "system" | "billing";
}

const permissions: Permission[] = [
  { id: "p1", name: "courses.view", description: "View courses", group: "content" },
  { id: "p2", name: "courses.create", description: "Create courses", group: "content" },
  { id: "p3", name: "courses.edit", description: "Edit courses", group: "content" },
  { id: "p4", name: "courses.delete", description: "Delete courses", group: "content" },
  { id: "p5", name: "courses.approve", description: "Approve courses", group: "content" },
  { id: "p6", name: "users.view", description: "View users", group: "users" },
  { id: "p7", name: "users.create", description: "Create users", group: "users" },
  { id: "p8", name: "users.edit", description: "Edit users", group: "users" },
  { id: "p9", name: "users.delete", description: "Delete users", group: "users" },
  { id: "p10", name: "system.view", description: "View system settings", group: "system" },
  { id: "p11", name: "system.edit", description: "Edit system settings", group: "system" },
  { id: "p12", name: "billing.view", description: "View billing information", group: "billing" },
  { id: "p13", name: "billing.manage", description: "Manage billing", group: "billing" },
];

// Mock data for system users
const mockSystemUsers: SystemUser[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", status: "active", createdAt: "2023-05-15", lastLogin: "2024-04-24" },
  { id: "2", name: "Moderator One", email: "mod1@example.com", role: "moderator", status: "active", createdAt: "2023-08-22", lastLogin: "2024-04-23" },
  { id: "3", name: "Moderator Two", email: "mod2@example.com", role: "moderator", status: "inactive", createdAt: "2023-11-10", lastLogin: "2024-03-15" },
  { id: "4", name: "Creator User", email: "creator@example.com", role: "creator", status: "active", createdAt: "2024-01-18", lastLogin: "2024-04-20" },
  { id: "5", name: "Learner User", email: "learner@example.com", role: "learner", status: "active", createdAt: "2024-02-05", lastLogin: "2024-04-22" },
  { id: "6", name: "Suspended User", email: "suspended@example.com", role: "learner", status: "suspended", createdAt: "2023-09-30", lastLogin: "2024-03-10" },
];

// Role definitions with descriptions and default permissions
const roleDefinitions = {
  admin: {
    description: "Full access to all system functions and data",
    defaultPermissions: ["*"],
  },
  moderator: {
    description: "Can manage content and assist with user support",
    defaultPermissions: [
      "courses.view", "courses.edit", "courses.approve",
      "users.view", "system.view"
    ],
  },
  creator: {
    description: "Can create and manage their own educational content",
    defaultPermissions: [
      "courses.view", "courses.create", "courses.edit"
    ],
  },
  learner: {
    description: "Can access educational content and their own data",
    defaultPermissions: [],
  }
};

export function SystemUsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isManageRoleDialogOpen, setIsManageRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("moderator");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
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
  
  const handleManageRole = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Role permissions updated");
    setIsManageRoleDialogOpen(false);
  };
  
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API endpoint
    toast.success("User deleted successfully");
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    
    // Reset and populate with default permissions for the selected role
    if (role === 'admin') {
      setSelectedPermissions(['*']);
    } else {
      setSelectedPermissions(roleDefinitions[role].defaultPermissions);
    }
  };
  
  const handlePermissionToggle = (permissionId: string) => {
    if (selectedPermissions.includes('*')) {
      // Remove wildcard if trying to customize permissions
      setSelectedPermissions([permissionId]);
      return;
    }
    
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <CardTitle>User & Role Management</CardTitle>
        <CardDescription>
          Manage system users, roles, and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
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
              <Search className="h-4 w-4 text-muted-foreground" />
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
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
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
          
          <TabsContent value="roles" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">System Roles</h3>
              <Button onClick={() => setIsManageRoleDialogOpen(true)} className="gap-2">
                <Shield className="h-4 w-4" />
                Manage Permissions
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(roleDefinitions) as UserRole[]).map((role) => (
                <Card key={role} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge
                        variant={
                          role === "admin" ? "default" : 
                          role === "moderator" ? "secondary" : "outline"
                        }
                        className="capitalize"
                      >
                        {role}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {roleDefinitions[role].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      {role === "admin" ? "Has all permissions" : "Key permissions:"}
                    </p>
                    {role !== "admin" && (
                      <div className="space-y-1">
                        {roleDefinitions[role].defaultPermissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="mr-1 mb-1">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
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
        
        {/* Manage Role Permissions Dialog */}
        <Dialog open={isManageRoleDialogOpen} onOpenChange={setIsManageRoleDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Manage Role Permissions</DialogTitle>
              <DialogDescription>
                Define permissions for each system role.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleManageRole} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <RadioGroup 
                  defaultValue="moderator" 
                  className="flex flex-wrap gap-4"
                  value={selectedRole}
                  onValueChange={(value) => handleRoleSelect(value as UserRole)}
                >
                  {(Object.keys(roleDefinitions) as UserRole[]).map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={`role-${role}`} />
                      <Label htmlFor={`role-${role}`} className="font-normal capitalize">{role}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Permissions</Label>
                <ScrollArea className="h-[300px] rounded border p-4">
                  <div className="space-y-6">
                    {selectedRole === 'admin' ? (
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="all-permissions" 
                          checked={selectedPermissions.includes('*')}
                          onCheckedChange={() => {
                            if (selectedPermissions.includes('*')) {
                              setSelectedPermissions([]);
                            } else {
                              setSelectedPermissions(['*']);
                            }
                          }}
                        />
                        <Label htmlFor="all-permissions" className="font-medium">All permissions (Administrator)</Label>
                      </div>
                    ) : (
                      ['content', 'users', 'system', 'billing'].map(group => (
                        <div key={group} className="space-y-2">
                          <h4 className="text-sm font-medium uppercase">{group}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {permissions.filter(p => p.group === group).map(permission => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={permission.id} 
                                  checked={selectedPermissions.includes(permission.name)}
                                  onCheckedChange={() => handlePermissionToggle(permission.name)}
                                />
                                <Label htmlFor={permission.id} className="font-normal">{permission.description}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsManageRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

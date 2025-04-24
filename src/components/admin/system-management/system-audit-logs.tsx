
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  RefreshCcw, 
  Download, 
  AlertCircle,
  User, 
  FileText,
  Settings,
  Shield,
  Eye,
  Calendar
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  action: string;
  resource: string;
  resourceType: "course" | "user" | "payment" | "system" | "content";
  ipAddress: string;
  status: "success" | "warning" | "error";
  details?: string;
}

// Mock data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: "log_1",
    timestamp: "2024-04-24T09:45:23Z",
    user: { id: "user_1", name: "Admin User", role: "admin" },
    action: "update",
    resource: "System Settings",
    resourceType: "system",
    ipAddress: "192.168.1.105",
    status: "success",
    details: "Updated payment gateway configuration"
  },
  {
    id: "log_2",
    timestamp: "2024-04-24T08:30:12Z",
    user: { id: "user_2", name: "Moderator User", role: "moderator" },
    action: "approve",
    resource: "Course: Introduction to Machine Learning",
    resourceType: "course",
    ipAddress: "103.44.128.72",
    status: "success"
  },
  {
    id: "log_3",
    timestamp: "2024-04-23T15:22:45Z",
    user: { id: "user_3", name: "John Smith", role: "creator" },
    action: "create",
    resource: "New Course: Advanced JavaScript",
    resourceType: "course",
    ipAddress: "51.89.22.165",
    status: "success"
  },
  {
    id: "log_4",
    timestamp: "2024-04-23T14:05:10Z",
    user: { id: "user_1", name: "Admin User", role: "admin" },
    action: "delete",
    resource: "User: james@example.com",
    resourceType: "user",
    ipAddress: "192.168.1.105",
    status: "warning"
  },
  {
    id: "log_5",
    timestamp: "2024-04-23T11:45:30Z",
    user: { id: "user_4", name: "Sarah Johnson", role: "learner" },
    action: "payment",
    resource: "Course: Financial Planning Fundamentals",
    resourceType: "payment",
    ipAddress: "72.14.189.45",
    status: "success"
  },
  {
    id: "log_6",
    timestamp: "2024-04-22T16:35:18Z",
    user: { id: "user_1", name: "Admin User", role: "admin" },
    action: "create",
    resource: "New Role: Content Manager",
    resourceType: "system",
    ipAddress: "192.168.1.105",
    status: "success"
  },
  {
    id: "log_7",
    timestamp: "2024-04-22T09:12:33Z",
    user: { id: "user_system", name: "System", role: "system" },
    action: "backup",
    resource: "Database Backup",
    resourceType: "system",
    ipAddress: "127.0.0.1",
    status: "error",
    details: "Backup failed due to insufficient storage space"
  },
  {
    id: "log_8",
    timestamp: "2024-04-21T20:05:46Z",
    user: { id: "user_5", name: "Michael Brown", role: "creator" },
    action: "update",
    resource: "Course: Web Development Bootcamp",
    resourceType: "course",
    ipAddress: "45.86.112.33",
    status: "success"
  },
  {
    id: "log_9",
    timestamp: "2024-04-21T13:23:57Z",
    user: { id: "user_6", name: "Emma Wilson", role: "learner" },
    action: "access",
    resource: "Course: Data Science Fundamentals",
    resourceType: "content",
    ipAddress: "112.78.45.92",
    status: "warning",
    details: "Unusual location detected"
  },
  {
    id: "log_10",
    timestamp: "2024-04-20T14:48:22Z",
    user: { id: "user_2", name: "Moderator User", role: "moderator" },
    action: "delete",
    resource: "Comment by user_7",
    resourceType: "content",
    ipAddress: "103.44.128.72",
    status: "success",
    details: "Comment violated community guidelines"
  }
];

export function SystemAuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Filters for the audit logs
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesUser = userFilter === "all" || log.user.role === userFilter;
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesResource = resourceFilter === "all" || log.resourceType === resourceFilter;
    const matchesDate = !date || new Date(log.timestamp).toDateString() === date.toDateString();
    
    return matchesSearch && matchesUser && matchesAction && matchesStatus && matchesResource && matchesDate;
  });
  
  const handleRefresh = () => {
    toast.success("Audit logs refreshed");
  };
  
  const handleExport = () => {
    toast.success("Audit logs export started");
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setUserFilter("all");
    setActionFilter("all");
    setStatusFilter("all");
    setResourceFilter("all");
    setDate(undefined);
    toast.success("Filters cleared");
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Create</Badge>;
      case "update":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Update</Badge>;
      case "delete":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Delete</Badge>;
      case "approve":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Approve</Badge>;
      case "payment":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Payment</Badge>;
      case "access":
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Access</Badge>;
      case "backup":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Backup</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };
  
  const getResourceTypeIcon = (resourceType: string) => {
    switch (resourceType) {
      case "course":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "user":
        return <User className="h-4 w-4 text-green-500" />;
      case "payment":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Payment</Badge>;
      case "system":
        return <Settings className="h-4 w-4 text-purple-500" />;
      case "content":
        return <FileText className="h-4 w-4 text-cyan-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-green-500">Success</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>System Audit Logs</CardTitle>
            <CardDescription>
              View and analyze system activity and security events
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" onClick={handleRefresh} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-2">
          <div className="flex items-center flex-1 space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search logs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex items-center gap-2 w-[220px] justify-start"
                >
                  <Calendar className="h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Filter by date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Filter toolbar */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="learner">Learner</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="backup">Backup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="content">Content</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Audit Logs Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No audit logs found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{log.user.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{log.user.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getActionIcon(log.action)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getResourceTypeIcon(log.resourceType)}
                        <span className="max-w-[200px] truncate">{log.resource}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell className="text-right">
                      {log.details ? (
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" /> View
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Error indicator */}
        {filteredLogs.some(log => log.status === "error") && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="text-sm">
              <span className="font-medium">System errors detected.</span> We recommend investigating these issues.
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {mockAuditLogs.length} logs
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

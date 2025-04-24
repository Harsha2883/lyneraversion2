
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AuditLog } from "../types/system.types";

// Mock data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: "log1",
    userId: "user1",
    userName: "Admin User",
    userRole: "admin",
    action: "created",
    resource: "user",
    resourceId: "user7",
    timestamp: "2024-04-24T10:15:22Z",
    ipAddress: "192.168.1.1",
    details: { email: "newuser@example.com" }
  },
  {
    id: "log2",
    userId: "user4",
    userName: "Creator User",
    userRole: "creator",
    action: "updated",
    resource: "course",
    resourceId: "course3",
    timestamp: "2024-04-23T15:30:45Z",
    ipAddress: "192.168.1.2"
  },
  {
    id: "log3",
    userId: "user2",
    userName: "Moderator One",
    userRole: "moderator",
    action: "approved",
    resource: "course",
    resourceId: "course5",
    timestamp: "2024-04-23T09:45:11Z",
    ipAddress: "192.168.1.3"
  },
  {
    id: "log4",
    userId: "user1",
    userName: "Admin User",
    userRole: "admin",
    action: "deleted",
    resource: "course",
    resourceId: "course7",
    timestamp: "2024-04-22T16:20:33Z",
    ipAddress: "192.168.1.1"
  },
  {
    id: "log5",
    userId: "system",
    userName: "System",
    userRole: "system",
    action: "backup",
    resource: "database",
    resourceId: "full",
    timestamp: "2024-04-21T01:00:00Z",
    ipAddress: "localhost"
  },
  {
    id: "log6",
    userId: "user3",
    userName: "Moderator Two",
    userRole: "moderator",
    action: "rejected",
    resource: "course",
    resourceId: "course9",
    timestamp: "2024-04-20T11:25:17Z",
    ipAddress: "192.168.1.4"
  }
];

export function SystemAuditLogs() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredLogs = logs.filter(log => {
    // Filter by action
    if (actionFilter !== "all" && log.action !== actionFilter) return false;
    
    // Filter by resource
    if (resourceFilter !== "all" && log.resource !== resourceFilter) return false;
    
    // Filter by date (if selected)
    if (date && !format(new Date(log.timestamp), "yyyy-MM-dd").includes(format(date, "yyyy-MM-dd"))) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.userName.toLowerCase().includes(query) ||
        log.userRole.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.resource.toLowerCase().includes(query) ||
        log.resourceId.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleExportLogs = () => {
    // In a real app, this would generate a CSV or JSON export
    console.log("Exporting logs...");
  };
  
  function getActionColor(action: string) {
    switch (action) {
      case "created":
        return "default"; // Blue
      case "updated":
        return "secondary"; // Purple
      case "deleted":
        return "destructive"; // Red
      case "approved":
        return "default"; // Green
      case "rejected":
        return "destructive"; // Red
      default:
        return "outline"; // Default
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="backup">System Backup</SelectItem>
            </SelectContent>
          </Select>
          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="database">Database</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="gap-2" onClick={handleExportLogs}>
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>System Audit Logs</CardTitle>
          <CardDescription>
            Comprehensive record of all actions performed in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No audit logs found matching the selected filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(log.timestamp), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground capitalize">{log.userRole}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActionColor(log.action)} className="capitalize">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium capitalize">{log.resource}</div>
                        <div className="text-xs text-muted-foreground">{log.resourceId}</div>
                      </TableCell>
                      <TableCell>
                        {log.ipAddress}
                      </TableCell>
                      <TableCell>
                        {log.details ? (
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-xs">None</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

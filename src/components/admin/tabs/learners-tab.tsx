
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search, Filter, MoreHorizontal, GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface Learner {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  status: "active" | "inactive";
  joinedDate: string;
  lastActive: string;
  progress: number;
}

// Mock data for learners
const mockLearners: Learner[] = [
  { id: "1", name: "Alex Johnson", email: "alex.johnson@example.com", enrolledCourses: 8, completedCourses: 5, status: "active", joinedDate: "2023-11-12", lastActive: "2024-04-23", progress: 75 },
  { id: "2", name: "Maria Garcia", email: "maria.garcia@example.com", enrolledCourses: 4, completedCourses: 4, status: "active", joinedDate: "2024-01-30", lastActive: "2024-04-24", progress: 100 },
  { id: "3", name: "James Wilson", email: "james.wilson@example.com", enrolledCourses: 10, completedCourses: 2, status: "active", joinedDate: "2023-09-15", lastActive: "2024-04-22", progress: 35 },
  { id: "4", name: "Sophia Lee", email: "sophia.lee@example.com", enrolledCourses: 3, completedCourses: 1, status: "active", joinedDate: "2024-03-05", lastActive: "2024-04-20", progress: 45 },
  { id: "5", name: "Daniel Brown", email: "daniel.brown@example.com", enrolledCourses: 6, completedCourses: 0, status: "inactive", joinedDate: "2023-12-10", lastActive: "2024-02-15", progress: 15 },
  { id: "6", name: "Emma Davis", email: "emma.davis@example.com", enrolledCourses: 5, completedCourses: 3, status: "active", joinedDate: "2024-02-18", lastActive: "2024-04-24", progress: 65 },
  { id: "7", name: "William Taylor", email: "william.taylor@example.com", enrolledCourses: 2, completedCourses: 2, status: "active", joinedDate: "2024-03-28", lastActive: "2024-04-23", progress: 100 },
  { id: "8", name: "Olivia Martinez", email: "olivia.martinez@example.com", enrolledCourses: 7, completedCourses: 1, status: "inactive", joinedDate: "2023-10-22", lastActive: "2024-03-12", progress: 25 },
];

export function LearnersTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredLearners = mockLearners.filter(learner => {
    const matchesSearch = 
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      learner.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || learner.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Learners Management</CardTitle>
        <CardDescription>
          Manage learner accounts, track course progress, and monitor engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[300px] flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search learners..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Export Data</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Learner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLearners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="font-medium">{learner.name}</div>
                        <div className="text-xs text-muted-foreground">{learner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={learner.status === "active" ? "default" : "outline"}
                      className="capitalize"
                    >
                      {learner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={learner.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{learner.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{learner.enrolledCourses}</span>
                      <span className="text-xs text-muted-foreground">({learner.completedCourses} completed)</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(learner.lastActive).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(learner.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredLearners.length} of {mockLearners.length} learners
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

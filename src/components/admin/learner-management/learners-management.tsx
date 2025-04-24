
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Eye, Trash, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { LearnerDetails } from "./learner-details";

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
  avatar?: string;
}

// Mock data for learners
const mockLearners: Learner[] = [
  { id: "1", name: "Morgan Smith", email: "morgan.smith@example.com", enrolledCourses: 12, completedCourses: 7, status: "active", joinedDate: "2023-09-15", lastActive: "2024-04-22", progress: 58 },
  { id: "2", name: "Jamie Johnson", email: "jamie.johnson@example.com", enrolledCourses: 8, completedCourses: 8, status: "active", joinedDate: "2024-01-10", lastActive: "2024-04-24", progress: 100 },
  { id: "3", name: "Taylor Rodriguez", email: "taylor.rodriguez@example.com", enrolledCourses: 5, completedCourses: 2, status: "active", joinedDate: "2024-02-22", lastActive: "2024-04-21", progress: 40 },
  { id: "4", name: "Casey Williams", email: "casey.williams@example.com", enrolledCourses: 3, completedCourses: 0, status: "inactive", joinedDate: "2023-11-05", lastActive: "2024-03-10", progress: 0 },
  { id: "5", name: "Riley Martinez", email: "riley.martinez@example.com", enrolledCourses: 7, completedCourses: 5, status: "active", joinedDate: "2023-12-18", lastActive: "2024-04-23", progress: 71 },
  { id: "6", name: "Jordan Davis", email: "jordan.davis@example.com", enrolledCourses: 2, completedCourses: 2, status: "active", joinedDate: "2024-03-05", lastActive: "2024-04-20", progress: 100 },
  { id: "7", name: "Avery Thompson", email: "avery.thompson@example.com", enrolledCourses: 9, completedCourses: 1, status: "inactive", joinedDate: "2023-10-30", lastActive: "2024-02-28", progress: 11 },
  { id: "8", name: "Quinn Robinson", email: "quinn.robinson@example.com", enrolledCourses: 4, completedCourses: 3, status: "active", joinedDate: "2024-01-25", lastActive: "2024-04-24", progress: 75 },
];

export function LearnersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  
  // Filter learners based on search query and status filter
  const filteredLearners = mockLearners.filter(learner => {
    const matchesSearch = 
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      learner.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || learner.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewLearner = (learnerId: string) => {
    setSelectedLearnerId(learnerId);
  };

  const handleDeleteLearner = (learnerId: string) => {
    // In a real app, this would call an API to delete the learner
    toast.success("Learner deleted successfully");
    // Remove from the UI in the mock data example
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    toast.success("Exporting learner data");
  };

  // If a learner is selected, show their detailed view
  if (selectedLearnerId) {
    return <LearnerDetails learnerId={selectedLearnerId} onBack={() => setSelectedLearnerId(null)} />;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
          <h2 className="text-lg font-medium">Learners Management</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportData} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex items-center flex-1 space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search learners..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
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
        </div>

        <div className="rounded-md border">
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
              {filteredLearners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No learners found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredLearners.map((learner) => (
                  <TableRow key={learner.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{learner.name}</div>
                        <div className="text-xs text-muted-foreground">{learner.email}</div>
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
                      <span>{learner.completedCourses}/{learner.enrolledCourses}</span>
                    </TableCell>
                    <TableCell>{new Date(learner.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(learner.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewLearner(learner.id)}
                          title="View learner details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteLearner(learner.id)}
                          title="Delete learner"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLearners.length} of {mockLearners.length} learners
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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MoreHorizontal, Check, X, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Course {
  id: string;
  title: string;
  creatorName: string;
  creatorEmail: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  category: string;
  earnings: number;
  enrollments: number;
  completions: number;
}

// Mock data for courses
const mockCourses: Course[] = [
  { 
    id: "1", 
    title: "Introduction to ESG Standards", 
    creatorName: "Jane Smith", 
    creatorEmail: "jane.smith@example.com",
    status: "approved", 
    submittedDate: "2024-03-15", 
    category: "ESG",
    earnings: 1250,
    enrollments: 78,
    completions: 45
  },
  { 
    id: "2", 
    title: "Carbon Market Fundamentals", 
    creatorName: "John Doe", 
    creatorEmail: "john.doe@example.com",
    status: "pending", 
    submittedDate: "2024-04-10", 
    category: "Carbon Markets",
    earnings: 0,
    enrollments: 0,
    completions: 0
  },
  { 
    id: "3", 
    title: "Sustainability in Corporate Governance", 
    creatorName: "Alice Williams", 
    creatorEmail: "alice.williams@example.com",
    status: "approved", 
    submittedDate: "2024-02-28", 
    category: "Sustainability",
    earnings: 875,
    enrollments: 42,
    completions: 36
  },
  { 
    id: "4", 
    title: "AI for Environmental Monitoring", 
    creatorName: "Robert Johnson", 
    creatorEmail: "robert.johnson@example.com",
    status: "rejected", 
    submittedDate: "2024-03-30", 
    category: "AI",
    earnings: 0,
    enrollments: 0,
    completions: 0
  },
  { 
    id: "5", 
    title: "CSR Implementation Strategies", 
    creatorName: "Emily Davis", 
    creatorEmail: "emily.davis@example.com",
    status: "pending", 
    submittedDate: "2024-04-05", 
    category: "CSR",
    earnings: 0,
    enrollments: 0,
    completions: 0
  }
];

// Helper function for badge variant selection moved outside components
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

export function CoursesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filterCourses = (courses: Course[]) => {
    return courses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.creatorEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || course.status === statusFilter;
      const matchesTab = activeTab === "all" || 
                        (activeTab === "pending" && course.status === "pending") ||
                        (activeTab === "approved" && course.status === "approved");
      
      return matchesSearch && matchesStatus && matchesTab;
    });
  };

  const filteredCourses = filterCourses(mockCourses);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Course Management</CardTitle>
        <CardDescription>
          Review, approve, and manage courses created by educators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-wrap items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] md:w-[300px]"
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <TabsContent value="all">
            <CourseTable courses={filteredCourses} />
          </TabsContent>
          
          <TabsContent value="pending">
            <CourseTable courses={filteredCourses} />
          </TabsContent>
          
          <TabsContent value="approved">
            <CourseTable courses={filteredCourses} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface CourseTableProps {
  courses: Course[];
}

function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Earnings</TableHead>
            <TableHead className="text-right">Enrollments</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No courses matching your filters
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">{course.category}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{course.creatorName}</div>
                    <div className="text-xs text-muted-foreground">{course.creatorEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(course.status)} className="capitalize">
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(course.submittedDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {course.earnings > 0 ? `$${course.earnings.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {course.enrollments > 0 ? course.enrollments : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Review">
                      <FileText className="h-4 w-4" />
                    </Button>
                    {course.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" title="Approve">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reject">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

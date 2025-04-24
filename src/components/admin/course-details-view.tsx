
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CourseEarning {
  month: string;
  revenue: number;
  enrollments: number;
  completions: number;
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    email: string;
  };
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  category: string;
  price: number;
  totalEarnings: number;
  totalEnrollments: number;
  totalCompletions: number;
  completionRate: number;
  monthlyEarnings: CourseEarning[];
}

// Mock data for a single course
const mockCourseDetails: CourseDetails = {
  id: "1",
  title: "Introduction to ESG Standards",
  description: "This comprehensive course covers the basics of Environmental, Social, and Governance standards and their implementation in modern business practices.",
  creator: {
    name: "Jane Smith",
    email: "jane.smith@example.com"
  },
  status: "approved",
  submittedDate: "2024-03-15",
  category: "ESG",
  price: 99.99,
  totalEarnings: 1250,
  totalEnrollments: 78,
  totalCompletions: 45,
  completionRate: 57.7,
  monthlyEarnings: [
    { month: "January 2024", revenue: 0, enrollments: 0, completions: 0 },
    { month: "February 2024", revenue: 0, enrollments: 0, completions: 0 },
    { month: "March 2024", revenue: 450, enrollments: 30, completions: 18 },
    { month: "April 2024", revenue: 800, enrollments: 48, completions: 27 }
  ]
};

interface CourseDetailsViewProps {
  courseId: string;
  onBack: () => void;
}

export function CourseDetailsView({ courseId, onBack }: CourseDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, you would fetch the course details based on courseId
  const course = mockCourseDetails;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-muted-foreground">
            Created by {course.creator.name} • {new Date(course.submittedDate).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Courses
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p>{course.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">Price</h3>
                  <p>${course.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <Badge 
                    variant={
                      course.status === "approved" ? "default" : 
                      course.status === "pending" ? "outline" : "destructive"
                    }
                    className="capitalize mt-1"
                  >
                    {course.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium">Creator</h3>
                  <p>{course.creator.name}</p>
                  <p className="text-sm text-muted-foreground">{course.creator.email}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                {course.status === "pending" && (
                  <>
                    <Button variant="default">Approve Course</Button>
                    <Button variant="outline">Reject Course</Button>
                  </>
                )}
                {course.status === "approved" && (
                  <Button variant="destructive">Suspend Course</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Course Earnings</CardTitle>
              <CardDescription>
                Revenue and financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">${course.totalEarnings.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{course.totalEnrollments}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Avg. Revenue / Student</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">
                      ${course.totalEnrollments > 0 
                        ? (course.totalEarnings / course.totalEnrollments).toFixed(2) 
                        : "0.00"}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Completions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.monthlyEarnings.map((earning, index) => (
                    <TableRow key={index}>
                      <TableCell>{earning.month}</TableCell>
                      <TableCell>${earning.revenue.toLocaleString()}</TableCell>
                      <TableCell>{earning.enrollments}</TableCell>
                      <TableCell>{earning.completions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>
                Performance metrics and student engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{course.completionRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {course.totalCompletions} out of {course.totalEnrollments} students
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">
                      {course.totalEnrollments - course.totalCompletions}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently taking the course
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">4.7/5</div>
                    <p className="text-xs text-muted-foreground">
                      Based on 32 reviews
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Learner Demographics</h3>
                  <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Demographics chart placeholder</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Engagement Over Time</h3>
                  <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Engagement chart placeholder</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

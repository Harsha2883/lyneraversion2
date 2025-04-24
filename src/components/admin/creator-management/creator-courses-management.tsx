
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreatorCoursesList } from "./creator-courses-list";
import { Search, Filter } from "lucide-react";
import type { Course } from "../types/course.types";

// Mock data for courses
const mockCourses: Course[] = [
  { 
    id: "1", 
    title: "Introduction to Machine Learning", 
    creatorName: "Dr. Sarah Johnson", 
    status: "approved", 
    earnings: 4500, 
    enrollments: 230, 
    completions: 185,
    createdAt: "2024-01-15T10:00:00Z",
    description: "Learn the fundamentals of machine learning algorithms and applications.",
    price: 49.99,
    rating: 4.7,
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "2", 
    title: "Advanced React Patterns", 
    creatorName: "Michael Chen", 
    status: "pending", 
    earnings: 0, 
    enrollments: 0, 
    completions: 0,
    createdAt: "2024-04-10T14:30:00Z",
    description: "Master advanced React patterns and optimization techniques.",
    price: 59.99,
    rating: 0,
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "3", 
    title: "Sustainable Business Practices", 
    creatorName: "Emma Wilson", 
    status: "rejected", 
    earnings: 0, 
    enrollments: 0, 
    completions: 0,
    createdAt: "2024-03-22T09:15:00Z",
    description: "Learn how to implement sustainable practices in business operations.",
    price: 39.99,
    rating: 0,
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "4", 
    title: "Data Visualization with D3.js", 
    creatorName: "Robert Davis", 
    status: "approved", 
    earnings: 2800, 
    enrollments: 145, 
    completions: 98,
    createdAt: "2024-02-08T11:20:00Z",
    description: "Create dynamic and interactive data visualizations with D3.js.",
    price: 54.99,
    rating: 4.5,
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "5", 
    title: "Financial Planning Fundamentals", 
    creatorName: "Jennifer Lopez", 
    status: "approved", 
    earnings: 3600, 
    enrollments: 195, 
    completions: 170,
    createdAt: "2024-01-30T13:45:00Z",
    description: "Learn the core principles of financial planning and wealth management.",
    price: 44.99,
    rating: 4.8,
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "6", 
    title: "Digital Marketing Strategy", 
    creatorName: "Alex Thompson", 
    status: "pending", 
    earnings: 0, 
    enrollments: 0, 
    completions: 0,
    createdAt: "2024-04-18T16:10:00Z",
    description: "Develop comprehensive digital marketing strategies for business growth.",
    price: 49.99,
    rating: 0,
    thumbnail: "/placeholder.svg"
  }
];

export function CreatorCoursesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter courses based on search query, status filter, and active tab
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "pending" && course.status === "pending") ||
                      (activeTab === "approved" && course.status === "approved") ||
                      (activeTab === "rejected" && course.status === "rejected");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">Export</Button>
              <Button>Add Course</Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="flex items-center flex-1 space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <CreatorCoursesList courses={filteredCourses} />
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <CreatorCoursesList 
              courses={filteredCourses.filter(course => course.status === "pending")} 
            />
          </TabsContent>
          
          <TabsContent value="approved" className="m-0">
            <CreatorCoursesList 
              courses={filteredCourses.filter(course => course.status === "approved")} 
            />
          </TabsContent>
          
          <TabsContent value="rejected" className="m-0">
            <CreatorCoursesList 
              courses={filteredCourses.filter(course => course.status === "rejected")} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

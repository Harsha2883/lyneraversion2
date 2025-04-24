
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { CourseTable } from "../components/course-table";
import { mockCourses } from "../utils/course.utils";
import type { Course } from "../types/course.types";

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

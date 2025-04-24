
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, Edit, Trash, MoreHorizontal } from "lucide-react";
import { TableFilters } from "../shared/components/filters/TableFilters";
import { DataTable } from "../shared/components/data-table/DataTable";
import { TablePagination } from "../shared/components/pagination/TablePagination";
import { useFilters } from "../shared/hooks/useFilters";
import { formatCurrency, calculateCompletionRate, formatDate } from "../shared/utils/format-utils";
import type { Course, CourseFilters } from "../types/course.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for courses
const mockCourses: Course[] = [
  { 
    id: "1", 
    title: "Introduction to Machine Learning", 
    creatorName: "Dr. Sarah Johnson", 
    creatorEmail: "sarah.johnson@example.com",
    status: "approved", 
    submittedDate: "2024-01-15",
    category: "Data Science",
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
    creatorEmail: "michael.chen@example.com",
    status: "pending", 
    submittedDate: "2024-04-10",
    category: "Web Development",
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
    creatorEmail: "emma.wilson@example.com",
    status: "rejected", 
    submittedDate: "2024-03-22",
    category: "Business",
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
    creatorEmail: "robert.davis@example.com",
    status: "approved", 
    submittedDate: "2024-02-08",
    category: "Data Science",
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
    creatorEmail: "jennifer.lopez@example.com",
    status: "approved", 
    submittedDate: "2024-01-30",
    category: "Finance",
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
    creatorEmail: "alex.thompson@example.com",
    status: "pending", 
    submittedDate: "2024-04-18",
    category: "Marketing",
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
  // States for filtering and pagination
  const [activeTab, setActiveTab] = useState("all");
  const { filters, setFilter } = useFilters<CourseFilters>({
    search: "",
    status: "all",
    category: "all"
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter courses based on filters and active tab
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                         course.creatorName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === "all" || course.status === filters.status;
    const matchesCategory = filters.category === "all" || course.category === filters.category;
    
    const matchesTab = activeTab === "all" || course.status === activeTab;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Table columns definition
  const columns = [
    {
      header: "Course",
      accessor: (course: Course) => (
        <div>
          <div className="font-medium">{course.title}</div>
          <div className="text-sm text-muted-foreground">{course.category}</div>
        </div>
      )
    },
    {
      header: "Creator",
      accessor: (course: Course) => (
        <div>
          <div>{course.creatorName}</div>
          <div className="text-xs text-muted-foreground">{course.creatorEmail}</div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (course: Course) => (
        <Badge 
          variant={
            course.status === "approved" ? "default" :
            course.status === "pending" ? "outline" : "destructive"
          }
          className="capitalize"
        >
          {course.status}
        </Badge>
      )
    },
    {
      header: "Submitted",
      accessor: (course: Course) => formatDate(course.submittedDate)
    },
    {
      header: "Earnings",
      accessor: (course: Course) => formatCurrency(course.earnings),
      className: "text-right"
    },
    {
      header: "Completion",
      accessor: (course: Course) => calculateCompletionRate(course.completions, course.enrollments),
      className: "text-right"
    },
    {
      header: "Actions",
      accessor: (course: Course) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" title="Edit course">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Remove course">
            <Trash className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Contact Creator</DropdownMenuItem>
              {course.status === "pending" && (
                <>
                  <DropdownMenuItem>Approve</DropdownMenuItem>
                  <DropdownMenuItem>Reject</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "text-right"
    }
  ];

  // Category options for filter
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Data Science", label: "Data Science" },
    { value: "Web Development", label: "Web Development" },
    { value: "Business", label: "Business" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" }
  ];

  // Status options for filter
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" }
  ];

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
          
          <TableFilters
            searchValue={filters.search}
            onSearchChange={(value) => setFilter("search", value)}
            filterOptions={[
              {
                name: "status",
                value: filters.status,
                options: statusOptions,
                onChange: (value) => setFilter("status", value)
              },
              {
                name: "category",
                value: filters.category,
                options: categoryOptions,
                onChange: (value) => setFilter("category", value)
              }
            ]}
            className="mb-4"
          />

          <TabsContent value="all" className="m-0">
            <DataTable 
              columns={columns}
              data={paginatedCourses}
              keyField="id"
              emptyMessage="No courses found matching your criteria"
            />
            
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsShown={paginatedCourses.length}
              totalItems={filteredCourses.length}
            />
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <DataTable 
              columns={columns}
              data={paginatedCourses.filter(course => course.status === "pending")}
              keyField="id"
              emptyMessage="No pending courses found"
            />
            
            <TablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCourses.filter(course => course.status === "pending").length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsShown={paginatedCourses.filter(course => course.status === "pending").length}
              totalItems={filteredCourses.filter(course => course.status === "pending").length}
            />
          </TabsContent>
          
          <TabsContent value="approved" className="m-0">
            <DataTable 
              columns={columns}
              data={paginatedCourses.filter(course => course.status === "approved")}
              keyField="id"
              emptyMessage="No approved courses found"
            />
            
            <TablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCourses.filter(course => course.status === "approved").length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsShown={paginatedCourses.filter(course => course.status === "approved").length}
              totalItems={filteredCourses.filter(course => course.status === "approved").length}
            />
          </TabsContent>
          
          <TabsContent value="rejected" className="m-0">
            <DataTable 
              columns={columns}
              data={paginatedCourses.filter(course => course.status === "rejected")}
              keyField="id"
              emptyMessage="No rejected courses found"
            />
            
            <TablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCourses.filter(course => course.status === "rejected").length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsShown={paginatedCourses.filter(course => course.status === "rejected").length}
              totalItems={filteredCourses.filter(course => course.status === "rejected").length}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

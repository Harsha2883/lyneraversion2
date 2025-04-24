import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CourseFilters } from "@/components/marketplace/course-filters";
import { CourseGrid } from "@/components/marketplace/course-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_COURSES } from "@/components/marketplace/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { CourseFilters as CourseFiltersType } from "@/components/marketplace/types";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("popular");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState<CourseFiltersType>({
    rating: null,
    priceRange: null,
    isFree: false,
    isForMembers: false,
    categories: [],
    certifications: [],
  });

  const filterCourses = (courses: typeof MOCK_COURSES) => {
    return courses.filter(course => {
      if (filters.rating && course.rating < filters.rating) {
        return false;
      }
      
      if (filters.isFree && course.price !== "Free") {
        return false;
      }
      
      if (filters.isForMembers && !course.isForMembers) {
        return false;
      }
      
      if (filters.priceRange) {
        const coursePrice = course.price === "Free" ? 0 : parseFloat(course.price.replace(/[^\d.-]/g, ''));
        if (coursePrice < filters.priceRange[0] || coursePrice > filters.priceRange[1]) {
          return false;
        }
      }
      
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false;
      }
      
      if (filters.certifications.length > 0 && !filters.certifications.some(cert => course.certifications.includes(cert))) {
        return false;
      }
      
      return true;
    });
  };

  const getCoursesByTab = () => {
    const filteredCourses = filterCourses(MOCK_COURSES);
    
    switch (activeTab) {
      case "popular":
        return [...filteredCourses].sort((a, b) => b.enrolled - a.enrolled);
      case "trending":
        return [...filteredCourses].sort((a, b) => b.trending - a.trending);
      case "latest":
        return [...filteredCourses].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return filteredCourses;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      {isSidebarCollapsed ? (
        <div className="w-16 border-r bg-background flex flex-col items-center py-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mb-4"
          >
            <LayoutDashboard className="h-6 w-6" />
          </Button>
        </div>
      ) : (
        <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
          <div className="flex justify-between items-center">
            <DashboardHeader 
              title="Explore Courses" 
              description="Browse and enroll in new learning opportunities"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <aside className="w-full lg:w-64 shrink-0">
              <CourseFilters filters={filters} setFilters={setFilters} />
            </aside>
            
            <div className="flex-1">
              <Tabs 
                defaultValue="popular" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="mb-6">
                  <TabsTrigger value="popular">Most Popular</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular" className="mt-0">
                  <CourseGrid courses={getCoursesByTab()} />
                </TabsContent>
                
                <TabsContent value="trending" className="mt-0">
                  <CourseGrid courses={getCoursesByTab()} />
                </TabsContent>
                
                <TabsContent value="latest" className="mt-0">
                  <CourseGrid courses={getCoursesByTab()} />
                </TabsContent>
                
                <TabsContent value="all" className="mt-0">
                  <CourseGrid courses={getCoursesByTab()} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

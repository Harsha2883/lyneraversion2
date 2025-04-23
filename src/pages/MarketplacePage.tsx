
import { useState } from "react";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CourseFilters } from "@/components/marketplace/course-filters";
import { CourseGrid } from "@/components/marketplace/course-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_COURSES } from "@/components/marketplace/mock-data";

// Filter types
export type CourseFilters = {
  rating: number | null;
  priceRange: [number, number] | null;
  isFree: boolean;
  isForMembers: boolean;
  categories: string[];
  certifications: string[];
};

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("popular");
  const [filters, setFilters] = useState<CourseFilters>({
    rating: null,
    priceRange: null,
    isFree: false,
    isForMembers: false,
    categories: [],
    certifications: [],
  });
  
  // Filter courses based on active filters
  const filterCourses = (courses: typeof MOCK_COURSES) => {
    return courses.filter(course => {
      // Filter by rating
      if (filters.rating && course.rating < filters.rating) {
        return false;
      }
      
      // Filter by price
      if (filters.isFree && course.price !== "Free") {
        return false;
      }
      
      // Filter by members-only
      if (filters.isForMembers && !course.isForMembers) {
        return false;
      }
      
      // Filter by price range
      if (filters.priceRange) {
        const coursePrice = course.price === "Free" ? 0 : parseFloat(course.price.replace(/[^\d.-]/g, ''));
        if (coursePrice < filters.priceRange[0] || coursePrice > filters.priceRange[1]) {
          return false;
        }
      }
      
      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false;
      }
      
      // Filter by certifications
      if (filters.certifications.length > 0 && !filters.certifications.some(cert => course.certifications.includes(cert))) {
        return false;
      }
      
      return true;
    });
  };

  // Get courses based on the active tab
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

  return (
    <LearnerDashboard>
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <DashboardHeader 
          title="Explore Courses" 
          description="Browse and enroll in new learning opportunities"
        />
        
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <CourseFilters filters={filters} setFilters={setFilters} />
          </aside>
          
          {/* Main content */}
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
    </LearnerDashboard>
  );
}

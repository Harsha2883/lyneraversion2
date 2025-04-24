
import type { Course } from "../../types/course.types";

/**
 * Gets appropriate badge variant based on course status
 */
export function getStatusBadgeVariant(status: Course['status']): "default" | "outline" | "destructive" {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
}

/**
 * Filters courses based on provided filters
 */
export function filterCourses(courses: Course[], searchQuery: string, statusFilter: string, categoryFilter: string) {
  return courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

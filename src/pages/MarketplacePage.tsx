
import React, { useState, useMemo } from 'react';
import { CourseGrid } from "@/components/marketplace/course-grid";
import { CourseFilters } from "@/components/marketplace/course-filters";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { CourseFilters as CourseFiltersType } from "@/components/marketplace/types";
import { CourseItem } from "@/components/marketplace/mock-data";

export default function MarketplacePage() {
  const [filters, setFilters] = useState<CourseFiltersType>({
    rating: null,
    priceRange: null,
    isFree: false,
    isForMembers: false,
    categories: [],
    certifications: []
  });

  // Import mock course data or use sample data
  const allCourses: CourseItem[] = [
    {
      id: "1",
      title: "Introduction to ESG",
      description: "Learn the fundamentals of Environmental, Social, and Governance principles",
      image: "/placeholder.svg",
      creator: { name: "Sarah Johnson", image: "/placeholder.svg" },
      category: "ESG",
      certifications: ["ACTD", "EAHEA"],
      price: "$249",
      duration: "4 weeks",
      rating: 4.5,
      enrolled: 1243,
      trending: 98,
      createdAt: "2023-09-15",
      isForMembers: false
    },
    {
      id: "2",
      title: "Corporate Sustainability Reporting",
      description: "Master the art of creating effective CSR reports",
      image: "/placeholder.svg",
      creator: { name: "Michael Chen", image: "/placeholder.svg" },
      category: "CSR",
      certifications: ["MEPSC", "Lynera"],
      price: "$299",
      duration: "6 weeks",
      rating: 4.8,
      enrolled: 856,
      trending: 76,
      createdAt: "2023-11-20",
      isForMembers: true
    },
    {
      id: "3",
      title: "Climate Change Mitigation Strategies",
      description: "Practical approaches to reduce carbon footprint",
      image: "/placeholder.svg",
      creator: { name: "Emma Roberts", image: "/placeholder.svg" },
      category: "Climate",
      certifications: ["EAHEA", "Others"],
      price: "Free",
      duration: "3 weeks",
      rating: 4.2,
      enrolled: 689,
      trending: 65,
      createdAt: "2023-09-30",
      isForMembers: false
    },
    {
      id: "4",
      title: "Carbon Markets and Trading",
      description: "Understanding carbon credits and global trading systems",
      image: "/placeholder.svg",
      creator: { name: "James Wilson", image: "/placeholder.svg" },
      category: "Carbon",
      certifications: ["ACTD", "MEPSC"],
      price: "$199",
      duration: "5 weeks",
      rating: 4.6,
      enrolled: 762,
      trending: 70,
      createdAt: "2023-12-01",
      isForMembers: false
    }
  ];

  // Filter courses based on the selected filters
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // Filter by rating
      if (filters.rating !== null && course.rating < filters.rating) {
        return false;
      }
      
      // Filter by price type
      if (filters.isFree && course.price !== "Free") {
        return false;
      }
      
      // Filter by member access
      if (filters.isForMembers && !course.isForMembers) {
        return false;
      }
      
      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false;
      }
      
      // Price range filtering could be added here if needed
      
      return true;
    });
  }, [filters, allCourses]);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <CourseFilters filters={filters} setFilters={setFilters} />
          </aside>
          <main className="flex-grow">
            <CourseGrid courses={filteredCourses} />
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}

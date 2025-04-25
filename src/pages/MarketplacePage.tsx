
import React from 'react';
import { CourseGrid } from "@/components/marketplace/course-grid";
import { CourseFilters } from "@/components/marketplace/course-filters";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export default function MarketplacePage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <CourseFilters />
          </aside>
          <main className="flex-grow">
            <CourseGrid />
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}

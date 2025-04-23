
import { CourseCardEnhanced } from "./course-card-enhanced";
import { CourseItem } from "./mock-data";

interface CourseGridProps {
  courses: CourseItem[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find what you're looking for
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCardEnhanced
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            image={course.image}
            creator={course.creator}
            category={course.category}
            price={course.price}
            duration={course.duration}
            rating={course.rating}
            isForMembers={course.isForMembers}
          />
        ))}
      </div>
    </div>
  );
}

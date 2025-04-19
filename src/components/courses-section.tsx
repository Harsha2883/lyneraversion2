
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";

export function CoursesSection() {
  const courses = [
    {
      id: "1",
      title: "ESG Reporting Fundamentals",
      description: "Learn the essentials of Environmental, Social, and Governance reporting standards and practices.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. Sarah Johnson",
        image: "/placeholder.svg",
      },
      categoryBadge: "ESG Compliance",
      duration: "6 hours",
      enrolled: 534,
    },
    {
      id: "2",
      title: "Carbon Footprint Calculation",
      description: "Master the methods to accurately measure and report carbon emissions for businesses and products.",
      image: "/placeholder.svg",
      creator: {
        name: "Prof. Michael Chen",
        image: "/placeholder.svg",
      },
      categoryBadge: "Carbon Management",
      duration: "8 hours",
      enrolled: 421,
    },
    {
      id: "3",
      title: "Sustainable Supply Chain Management",
      description: "Strategies for developing and maintaining environmentally responsible supply chains.",
      image: "/placeholder.svg",
      creator: {
        name: "Emma Rodriguez",
        image: "/placeholder.svg",
      },
      categoryBadge: "Sustainable Business",
      duration: "10 hours",
      enrolled: 312,
    },
    {
      id: "4",
      title: "Climate Regulations & Compliance",
      description: "Navigate the complex landscape of global climate regulations and ensure business compliance.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. James Wilson",
        image: "/placeholder.svg",
      },
      categoryBadge: "Climate Regulations",
      duration: "7 hours",
      enrolled: 287,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Popular Courses</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our most enrolled courses on sustainability and ESG topics. Start your learning journey today.
          </p>
        </div>
        <Button variant="outline">View All Courses</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            image={course.image}
            creator={course.creator}
            categoryBadge={course.categoryBadge}
            duration={course.duration}
            enrolled={course.enrolled}
          />
        ))}
      </div>
    </section>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CourseCard } from "@/components/course-card";

export function CourseRecommendations() {
  // Mocked data for demonstration
  const recommendedCourses = [
    {
      id: "rec1",
      title: "Advanced ESG Reporting & Analysis",
      description: "Take your ESG reporting skills to the next level with in-depth analysis techniques and advanced frameworks.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. Sarah Johnson",
        image: "/placeholder.svg",
      },
      categoryBadge: "ESG Compliance",
      duration: "8 hours",
      match: "98% match"
    },
    {
      id: "rec2",
      title: "Corporate Carbon Neutrality Strategies",
      description: "Learn how to develop and implement effective carbon neutrality strategies for organizations of any size.",
      image: "/placeholder.svg",
      creator: {
        name: "Prof. Michael Chen",
        image: "/placeholder.svg",
      },
      categoryBadge: "Carbon Management",
      duration: "10 hours",
      match: "95% match"
    },
    {
      id: "rec3",
      title: "EU Sustainability Reporting Directives",
      description: "Stay compliant with the latest EU sustainability reporting directives and regulations.",
      image: "/placeholder.svg",
      creator: {
        name: "Emma Rodriguez",
        image: "/placeholder.svg",
      },
      categoryBadge: "Climate Regulations",
      duration: "6 hours",
      match: "92% match"
    },
    {
      id: "rec4",
      title: "Circular Economy Implementation",
      description: "Practical strategies for implementing circular economy principles in your organization.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. James Wilson",
        image: "/placeholder.svg",
      },
      categoryBadge: "Sustainable Business",
      duration: "12 hours",
      match: "90% match"
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-medium">Personalized Recommendations</CardTitle>
        <Sparkles className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your learning history and skills profile
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedCourses.map((course) => (
              <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    creator={course.creator}
                    categoryBadge={course.categoryBadge}
                    duration={course.duration}
                  />
                  <div className="mt-2 text-xs font-medium text-primary">
                    {course.match}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}

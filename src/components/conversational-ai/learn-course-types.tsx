
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Data, GraduationCap } from "lucide-react";

interface LearnCourseTypesProps {
  onSelectCourse: (courseId: string) => void;
}

export function LearnCourseTypes({ onSelectCourse }: LearnCourseTypesProps) {
  // Sample courses - in a real app, these would come from an API
  const dataBackedCourses = [
    { id: "db-1", title: "Sustainable Energy", description: "Learn about renewable energy sources and their impact" },
    { id: "db-2", title: "Climate Change", description: "Understanding climate change and its effects on our planet" }
  ];
  
  const aiBackedCourses = [
    { id: "ai-1", title: "Green Technology", description: "Explore innovative technologies for a sustainable future" },
    { id: "ai-2", title: "Sustainable Living", description: "Practical steps for a more sustainable lifestyle" }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="data-backed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data-backed" className="flex items-center gap-2">
            <Data className="h-4 w-4" />
            Data-backed Courses
          </TabsTrigger>
          <TabsTrigger value="ai-backed" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            AI-backed Courses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-backed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {dataBackedCourses.map((course) => (
              <CourseCard 
                key={course.id}
                title={course.title}
                description={course.description}
                onClick={() => onSelectCourse(course.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ai-backed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {aiBackedCourses.map((course) => (
              <CourseCard 
                key={course.id}
                title={course.title}
                description={course.description}
                onClick={() => onSelectCourse(course.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Course card component
function CourseCard({ title, description, onClick }: { 
  title: string; 
  description: string; 
  onClick: () => void 
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 bg-muted rounded-md flex items-center justify-center">
          <GraduationCap className="h-12 w-12 text-muted-foreground/50" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">Start Learning</Button>
      </CardFooter>
    </Card>
  );
}

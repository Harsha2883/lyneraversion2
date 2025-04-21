
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { CourseHistoryItem } from "@/components/learning-journey/types";

interface CourseHistoryProps {
  courses: CourseHistoryItem[];
}

export function CourseHistory({ courses }: CourseHistoryProps) {
  const completedCourses = courses.filter(course => course.status === "completed");
  const completionRate = (completedCourses.length / courses.length) * 100;

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Completion Overview</CardTitle>
          <CardDescription>Your learning progress so far</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">{courses.length} Total Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-500" />
              <span className="font-medium">{completedCourses.length} Completed</span>
            </div>
          </div>
          <Progress value={completionRate} className="h-2 mb-1" />
          <p className="text-sm text-muted-foreground mt-1">
            {completionRate.toFixed(0)}% completion rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Timeline</CardTitle>
          <CardDescription>All courses you've enrolled in or completed</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                    <Badge 
                      variant={
                        course.status === "completed" ? "success" : 
                        course.status === "in-progress" ? "default" : "outline"
                      }
                    >
                      {course.status === "completed" ? "Completed" : 
                       course.status === "in-progress" ? "In Progress" : "Not Started"}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {course.enrollmentDate ? 
                        `Enrolled ${formatDistanceToNow(new Date(course.enrollmentDate), { addSuffix: true })}` : 
                        "Not enrolled"}
                    </div>
                  </div>
                  {course.completionDate && (
                    <div className="mt-1 text-sm text-right text-green-600">
                      Completed {formatDistanceToNow(new Date(course.completionDate), { addSuffix: true })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

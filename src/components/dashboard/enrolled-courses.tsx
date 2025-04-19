
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function EnrolledCourses() {
  // Mocked data for demonstration
  const enrolledCount = 5;
  const inProgressCount = 3;
  const completedCount = 2;
  const progressPercentage = (completedCount / enrolledCount) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{enrolledCount}</div>
        <div className="text-xs text-muted-foreground mb-2">
          {inProgressCount} in progress, {completedCount} completed
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </CardContent>
    </Card>
  );
}


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const recentCourses = [
  { title: "Net Zero Fundamentals", date: "2024-04-10" },
  { title: "Sustainable Leadership", date: "2024-04-01" },
  { title: "Carbon Management Mastery", date: "2024-03-21" },
];

export function RecentCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2">
          {recentCourses.map((course) => (
            <li key={course.title} className="flex justify-between">
              <span>{course.title}</span>
              <span className="text-xs text-muted-foreground">{course.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

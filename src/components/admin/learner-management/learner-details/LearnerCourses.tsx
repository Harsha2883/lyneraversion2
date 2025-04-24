
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { formatDate } from "../../shared/utils/format-utils";

// Mock course data for the learner
interface LearnerCourse {
  id: string;
  name: string;
  enrollmentDate: string;
  completionDate?: string;
  progress: number;
  status: "completed" | "in_progress" | "not_started";
}

const mockLearnerCourses: Record<string, LearnerCourse[]> = {
  "1": [
    { id: "c1", name: "Introduction to Machine Learning", enrollmentDate: "2024-01-15", completionDate: "2024-02-10", progress: 100, status: "completed" },
    { id: "c2", name: "Advanced React Patterns", enrollmentDate: "2024-02-20", completionDate: "2024-03-15", progress: 100, status: "completed" },
    { id: "c3", name: "Sustainable Business Practices", enrollmentDate: "2024-03-05", progress: 45, status: "in_progress" },
    { id: "c4", name: "Data Visualization with D3.js", enrollmentDate: "2024-04-01", progress: 10, status: "in_progress" },
    { id: "c5", name: "Financial Planning Fundamentals", enrollmentDate: "2024-04-15", progress: 0, status: "not_started" }
  ]
};

interface LearnerCoursesProps {
  learnerId: string;
}

export function LearnerCourses({ learnerId }: LearnerCoursesProps) {
  // In a real app, this would fetch course data from an API
  const courses = mockLearnerCourses[learnerId] || [];

  const columns = [
    {
      header: "Course",
      accessor: "name"
    },
    {
      header: "Enrollment Date",
      accessor: (course: LearnerCourse) => formatDate(course.enrollmentDate)
    },
    {
      header: "Progress",
      accessor: (course: LearnerCourse) => (
        <div className="flex flex-col gap-1">
          <Progress value={course.progress} className="h-2" />
          <span className="text-xs text-muted-foreground">{course.progress}%</span>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (course: LearnerCourse) => (
        <Badge 
          variant={
            course.status === "completed" ? "default" :
            course.status === "in_progress" ? "outline" : "secondary"
          }
          className="capitalize"
        >
          {course.status === "in_progress" ? "In Progress" : 
           course.status === "completed" ? "Completed" : "Not Started"}
        </Badge>
      )
    },
    {
      header: "Completion Date",
      accessor: (course: LearnerCourse) => 
        course.completionDate ? formatDate(course.completionDate) : "—"
    }
  ];

  return (
    <Card>
      <DataTable
        columns={columns}
        data={courses}
        keyField="id"
        emptyMessage="No courses enrolled"
      />
    </Card>
  );
}


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import type { Course } from "../types/course.types";

interface CreatorCoursesListProps {
  courses: Course[];
}

export function CreatorCoursesList({ courses }: CreatorCoursesListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Enrollments</TableHead>
            <TableHead>Completion Rate</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No courses found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.creatorName}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      course.status === "approved" ? "default" :
                      course.status === "pending" ? "outline" : "destructive"
                    }
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>${course.earnings.toLocaleString()}</TableCell>
                <TableCell>{course.enrollments}</TableCell>
                <TableCell>
                  {course.enrollments > 0 
                    ? `${Math.round((course.completions / course.enrollments) * 100)}%`
                    : 'N/A'
                  }
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Edit course">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Remove course">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

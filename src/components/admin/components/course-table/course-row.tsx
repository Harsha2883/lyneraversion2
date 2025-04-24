
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant } from "../../utils/course.utils";
import { CourseActions } from "./course-actions";
import type { Course } from "../../types/course.types";

interface CourseRowProps {
  course: Course;
}

export function CourseRow({ course }: CourseRowProps) {
  return (
    <TableRow key={course.id}>
      <TableCell>
        <div>
          <div className="font-medium">{course.title}</div>
          <div className="text-sm text-muted-foreground">{course.category}</div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div>{course.creatorName}</div>
          <div className="text-xs text-muted-foreground">{course.creatorEmail}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(course.status)} className="capitalize">
          {course.status}
        </Badge>
      </TableCell>
      <TableCell>{new Date(course.submittedDate).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        {course.earnings > 0 ? `$${course.earnings.toLocaleString()}` : "—"}
      </TableCell>
      <TableCell className="text-right">
        {course.enrollments > 0 ? course.enrollments : "—"}
      </TableCell>
      <TableCell className="text-right">
        <CourseActions course={course} />
      </TableCell>
    </TableRow>
  );
}

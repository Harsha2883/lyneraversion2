
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CourseTableHeader } from "./course-table/table-header";
import { CourseRow } from "./course-table/course-row";
import type { Course } from "../types/course.types";

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <CourseTableHeader />
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No courses matching your filters
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <CourseRow key={course.id} course={course} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Check, X, MoreHorizontal } from "lucide-react";
import { getStatusBadgeVariant } from "../utils/course.utils";
import type { Course } from "../types/course.types";

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Earnings</TableHead>
            <TableHead className="text-right">Enrollments</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No courses matching your filters
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
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
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Review">
                      <FileText className="h-4 w-4" />
                    </Button>
                    {course.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" title="Approve">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reject">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
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

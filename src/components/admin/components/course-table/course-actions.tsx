
import { Button } from "@/components/ui/button";
import { FileText, Check, X, MoreHorizontal } from "lucide-react";
import type { Course } from "../../types/course.types";

interface CourseActionsProps {
  course: Course;
}

export function CourseActions({ course }: CourseActionsProps) {
  return (
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
  );
}

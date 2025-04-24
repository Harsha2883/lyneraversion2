
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CourseTableHeader() {
  return (
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
  );
}

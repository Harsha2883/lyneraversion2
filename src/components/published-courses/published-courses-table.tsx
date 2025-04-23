
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";

interface Course {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'published' | 'draft';
}

// Mock data - replace with real data later
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Carbon Credits",
    status: "published",
    lastUpdated: "2024-03-15",
  },
  {
    id: "2",
    title: "Sustainable Business Practices",
    status: "published",
    lastUpdated: "2024-03-14",
  },
];

export function PublishedCoursesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.lastUpdated}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  {course.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="default" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

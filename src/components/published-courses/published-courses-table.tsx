
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'published' | 'draft';
  price: string;
}

// Mock data - replace with real data later
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Carbon Credits",
    status: "published",
    lastUpdated: "2024-03-15",
    price: "$99",
  },
];

export function PublishedCoursesTable() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEdit = (courseId: string) => {
    navigate(`/dashboard/courses-published/edit/${courseId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
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
              <TableCell>{course.price}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(course.id)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

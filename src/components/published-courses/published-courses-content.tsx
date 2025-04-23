
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { edit, save } from "lucide-react";

interface PublishedCourse {
  id: string;
  title: string;
  description: string;
  status: 'published' | 'draft';
  lastUpdated: string;
}

// Temporary mock data - replace with real data later
const mockCourses: PublishedCourse[] = [
  {
    id: "1",
    title: "Introduction to Carbon Credits",
    description: "Learn the basics of carbon credit trading",
    status: "published",
    lastUpdated: "2024-03-15"
  },
  // Add more mock courses as needed
];

export function PublishedCoursesContent() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Published Courses</h1>
        <p className="text-muted-foreground">
          View and manage your published courses. Click on a course to edit its content.
        </p>
      </div>

      <div className="grid gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="default" size="sm">
                  <save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
                  <TabsTrigger value="details">Course Details</TabsTrigger>
                  <TabsTrigger value="content">Course Content</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Course Information</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {course.lastUpdated}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="content">
                  <div className="p-4 text-center text-muted-foreground">
                    Course content editor will be displayed here
                  </div>
                </TabsContent>

                <TabsContent value="assessments">
                  <div className="p-4 text-center text-muted-foreground">
                    Assessment editor will be displayed here
                  </div>
                </TabsContent>

                <TabsContent value="certificates">
                  <div className="p-4 text-center text-muted-foreground">
                    Certificate management will be displayed here
                  </div>
                </TabsContent>

                <TabsContent value="tokens">
                  <div className="p-4 text-center text-muted-foreground">
                    Token management will be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

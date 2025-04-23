
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseDetailsForm } from "./course-details-form";

export function CreateCourseContent() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Create a New Course</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your new course. Start with the course details and continue through each tab.
        </p>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 md:grid-cols-5 lg:w-3/4">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content" disabled>Content</TabsTrigger>
          <TabsTrigger value="assessment" disabled>Assessment</TabsTrigger>
          <TabsTrigger value="requirements" disabled>Requirements</TabsTrigger>
          <TabsTrigger value="publish" disabled>Publish</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <CourseDetailsForm />
        </TabsContent>
        <TabsContent value="content">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete the course details first.</p>
          </div>
        </TabsContent>
        <TabsContent value="assessment">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete the content section first.</p>
          </div>
        </TabsContent>
        <TabsContent value="requirements">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete the assessment section first.</p>
          </div>
        </TabsContent>
        <TabsContent value="publish">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete all previous sections first.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

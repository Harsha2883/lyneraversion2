import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseDetailsForm } from "./course-details-form";
import CourseContentTab from "./CourseContentTab";
import AssessmentTab from "./AssessmentTab";

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
        <TabsList className="mb-6 grid w-full grid-cols-3 md:grid-cols-6 lg:w-full overflow-x-auto">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="check-assessment" disabled>Check Assessment</TabsTrigger>
          <TabsTrigger value="certificates" disabled>Certificates</TabsTrigger>
          <TabsTrigger value="tokens" disabled>Tokens</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <CourseDetailsForm />
        </TabsContent>
        <TabsContent value="content">
          <CourseContentTab />
        </TabsContent>
        <TabsContent value="assessment">
          <AssessmentTab />
        </TabsContent>
        <TabsContent value="check-assessment">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete the assessment section first.</p>
          </div>
        </TabsContent>
        <TabsContent value="certificates">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete all previous sections first.</p>
          </div>
        </TabsContent>
        <TabsContent value="tokens">
          <div className="rounded-md border p-10 text-center">
            <p className="text-muted-foreground">Complete all previous sections first.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

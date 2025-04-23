
import { useState } from "react";
import { PublishedCoursesTable } from "./published-courses-table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseDetailsForm } from "@/components/create-course/course-details-form";
import CourseContentTab from "@/components/create-course/CourseContentTab";
import AssessmentTab from "@/components/create-course/AssessmentTab";
import { CertificatesTab } from "@/components/create-course/CertificatesTab";
import { TokenManagementTab } from "@/components/create-course/TokenManagementTab";
import { PricingTab } from "@/components/create-course/PricingTab";

export function PublishedCoursesContent() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Published Courses</h1>
        <p className="text-muted-foreground">
          View and manage your published courses. Click on a course to edit its content.
        </p>
      </div>

      <PublishedCoursesTable />

      {selectedCourseId && (
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="details">Course Details</TabsTrigger>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <CourseDetailsForm />
              </TabsContent>

              <TabsContent value="content">
                <CourseContentTab />
              </TabsContent>

              <TabsContent value="assessments">
                <AssessmentTab />
              </TabsContent>

              <TabsContent value="certificates">
                <CertificatesTab />
              </TabsContent>

              <TabsContent value="tokens">
                <TokenManagementTab />
              </TabsContent>

              <TabsContent value="pricing">
                <PricingTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

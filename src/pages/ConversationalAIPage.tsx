
import { useState } from "react";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnTab } from "@/components/conversational-ai/learn-tab";
import { TokensTab } from "@/components/conversational-ai/tokens-tab";
import { NotesTab } from "@/components/conversational-ai/notes-tab";
import { AssessmentsTab } from "@/components/conversational-ai/assessments-tab";
import { CertificatesTab } from "@/components/conversational-ai/certificates-tab";
import { CourseReviewTab } from "@/components/conversational-ai/CourseReviewTab";

export default function ConversationalAIPage() {
  const [activeTab, setActiveTab] = useState("learn");
  
  // Mock data - in a real app these would come from the course context
  const mockCourseId = "course-123";
  const mockCreatorId = "creator-456";

  return (
    <LearnerDashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">AI-powered Learning</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="assess">Assessment</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="learn" className="space-y-4">
            <LearnTab />
          </TabsContent>
          <TabsContent value="assess" className="space-y-4">
            <AssessmentsTab />
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            <NotesTab />
          </TabsContent>
          <TabsContent value="tokens" className="space-y-4">
            <TokensTab />
          </TabsContent>
          <TabsContent value="certificates" className="space-y-4">
            <CertificatesTab />
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            <CourseReviewTab 
              courseId={mockCourseId}
              creatorId={mockCreatorId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </LearnerDashboard>
  );
}

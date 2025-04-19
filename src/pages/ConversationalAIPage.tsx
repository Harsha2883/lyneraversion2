
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnTab } from "@/components/conversational-ai/learn-tab";
import { NotesTab } from "@/components/conversational-ai/notes-tab";
import { AssessmentsTab } from "@/components/conversational-ai/assessments-tab";
import { CertificatesTab } from "@/components/conversational-ai/certificates-tab";
import { TokensTab } from "@/components/conversational-ai/tokens-tab";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function ConversationalAIPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <DashboardHeader 
        title="Conversational AI Learning"
        description="Learn, practice, and earn certificates through AI-powered conversations"
      />
      
      <div className="mt-6">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="w-full border-b justify-start">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>
          <TabsContent value="learn">
            <LearnTab />
          </TabsContent>
          <TabsContent value="notes">
            <NotesTab />
          </TabsContent>
          <TabsContent value="assessments">
            <AssessmentsTab />
          </TabsContent>
          <TabsContent value="certificates">
            <CertificatesTab />
          </TabsContent>
          <TabsContent value="tokens">
            <TokensTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

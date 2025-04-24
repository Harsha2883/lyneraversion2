
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";
import { formatDate } from "../../shared/utils/format-utils";
import { LearnerPayments } from "./LearnerPayments";
import { LearnerCourses } from "./LearnerCourses";
import { LearnerCertificates } from "./LearnerCertificates";
import { LearnerAssessments } from "./LearnerAssessments";
import type { Learner } from "../../types/learner.types";

// Mock data for a detailed learner view
const mockLearnerDetails: Record<string, Learner> = {
  "1": {
    id: "1",
    name: "Morgan Smith",
    email: "morgan.smith@example.com",
    enrolledCourses: 12,
    completedCourses: 7,
    status: "active",
    joinedDate: "2023-09-15",
    lastActive: "2024-04-22",
    progress: 58,
    tokens: 135,
    payments: [
      { id: "p1", amount: 49.99, date: "2024-01-15", status: "completed", method: "Credit Card", courseId: "c1", courseName: "Introduction to Machine Learning" },
      { id: "p2", amount: 29.99, date: "2024-02-20", status: "completed", method: "PayPal", courseId: "c2", courseName: "Advanced React Patterns" },
      { id: "p3", amount: 19.99, date: "2024-03-05", status: "completed", method: "Credit Card", courseId: "c3", courseName: "Sustainable Business Practices" }
    ],
    certificates: [
      { id: "cert1", name: "Machine Learning Mastery", courseId: "c1", courseName: "Introduction to Machine Learning", issueDate: "2024-02-10" },
      { id: "cert2", name: "React Advanced Developer", courseId: "c2", courseName: "Advanced React Patterns", issueDate: "2024-03-15" }
    ],
    assessments: [
      { id: "a1", courseId: "c1", courseName: "Introduction to Machine Learning", score: 92, maxScore: 100, date: "2024-02-08", status: "passed", attempts: 1 },
      { id: "a2", courseId: "c2", courseName: "Advanced React Patterns", score: 88, maxScore: 100, date: "2024-03-12", status: "passed", attempts: 2 },
      { id: "a3", courseId: "c3", courseName: "Sustainable Business Practices", score: 45, maxScore: 100, date: "2024-03-20", status: "failed", attempts: 1 }
    ]
  }
};

interface LearnerDetailsProps {
  learnerId: string;
  onBack: () => void;
}

export function LearnerDetails({ learnerId, onBack }: LearnerDetailsProps) {
  // In a real app, this would fetch the learner data from an API
  const learner = mockLearnerDetails[learnerId];

  // Handle case where learner is not found
  if (!learner) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-xl font-semibold mb-2">Learner Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested learner does not exist or has been deleted.</p>
        <Button onClick={onBack}>Back to Learners</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Learners
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-8 w-8 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{learner.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{learner.email}</span>
            <Badge variant={learner.status === "active" ? "default" : "outline"} className="capitalize">
              {learner.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Joined</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatDate(learner.joinedDate)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{learner.completedCourses}/{learner.enrolledCourses}</p>
            <p className="text-sm text-muted-foreground">Courses completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatDate(learner.lastActive)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tokens Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{learner.tokens || 0}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-6">
          <LearnerCourses learnerId={learnerId} />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <LearnerPayments payments={learner.payments || []} />
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-6">
          <LearnerCertificates certificates={learner.certificates || []} />
        </TabsContent>
        
        <TabsContent value="assessments" className="space-y-6">
          <LearnerAssessments assessments={learner.assessments || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Award, 
  FileBadge, 
  Clock, 
  BadgeCheck, 
  CreditCard, 
  Trash, 
  ArrowLeft, 
  Coins
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
}

interface Course {
  id: string;
  title: string;
  completedAt: string | null;
  progress: number;
}

interface Certificate {
  id: string;
  title: string;
  issuedAt: string;
  courseId: string;
}

interface Assessment {
  id: string;
  courseId: string;
  courseName: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

interface LearnerDetailsProps {
  learnerId: string;
  onBack: () => void;
}

// In a real app, this would fetch data from the backend
const useLearnerDetails = (learnerId: string) => {
  // Mock data
  return {
    id: learnerId,
    name: "Morgan Smith",
    email: "morgan.smith@example.com",
    avatar: "/placeholder.svg",
    joinedDate: "2023-09-15",
    lastActive: "2024-04-22",
    status: "active",
    coursesCompleted: 7,
    coursesEnrolled: 12,
    tokensEarned: 350,
    carbonFootprint: 28.5, // kg CO2
    payments: [
      { id: "p1", date: "2024-03-15", amount: 49.99, method: "Credit Card", status: "completed" },
      { id: "p2", date: "2024-02-20", amount: 29.99, method: "PayPal", status: "completed" },
      { id: "p3", date: "2024-01-10", amount: 99.99, method: "Credit Card", status: "completed" },
    ] as Payment[],
    courses: [
      { id: "c1", title: "Introduction to Machine Learning", completedAt: "2024-03-20", progress: 100 },
      { id: "c2", title: "Financial Planning Fundamentals", completedAt: "2024-02-15", progress: 100 },
      { id: "c3", title: "Data Visualization with D3.js", completedAt: null, progress: 68 },
      { id: "c4", title: "Web Development Bootcamp", completedAt: "2024-01-25", progress: 100 },
    ] as Course[],
    certificates: [
      { id: "cert1", title: "Machine Learning Expert", issuedAt: "2024-03-20", courseId: "c1" },
      { id: "cert2", title: "Financial Planning Certification", issuedAt: "2024-02-15", courseId: "c2" },
      { id: "cert3", title: "Web Development Completion", issuedAt: "2024-01-25", courseId: "c4" },
    ] as Certificate[],
    assessments: [
      { id: "a1", courseId: "c1", courseName: "Introduction to Machine Learning", score: 92, maxScore: 100, completedAt: "2024-03-20" },
      { id: "a2", courseId: "c2", courseName: "Financial Planning Fundamentals", score: 88, maxScore: 100, completedAt: "2024-02-15" },
      { id: "a3", courseId: "c3", courseName: "Data Visualization with D3.js", score: 45, maxScore: 100, completedAt: "2024-04-10" },
      { id: "a4", courseId: "c4", courseName: "Web Development Bootcamp", score: 95, maxScore: 100, completedAt: "2024-01-25" },
    ] as Assessment[],
    comments: [
      { id: "comm1", courseId: "c1", content: "Great course, very informative!", date: "2024-03-21", rating: 5 },
      { id: "comm2", courseId: "c2", content: "Solid content, but could use more examples", date: "2024-02-16", rating: 4 },
    ],
    subscriptionStatus: "active",
    subscriptionPlan: "Annual Premium",
    subscriptionRenewal: "2025-01-15",
  };
};

export function LearnerDetails({ learnerId, onBack }: LearnerDetailsProps) {
  const learner = useLearnerDetails(learnerId);
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDeleteLearner = () => {
    // In a real app, this would call an API to delete the learner
    toast.success("Learner account deleted successfully");
    onBack();
  };
  
  const handleDeleteComment = (commentId: string) => {
    // In a real app, this would call an API to delete the comment
    toast.success("Comment deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Learners
        </Button>
        
        <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)} className="gap-2">
          <Trash className="h-4 w-4" />
          Delete Learner
        </Button>
      </div>
      
      {showDeleteConfirm && (
        <Alert variant="destructive">
          <AlertTitle>Are you sure you want to delete this learner?</AlertTitle>
          <AlertDescription>
            This action cannot be undone. This will permanently delete the account and all associated data.
            <div className="flex space-x-2 mt-4">
              <Button variant="destructive" onClick={handleDeleteLearner}>
                Yes, delete account
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={learner.avatar} alt={learner.name} />
                <AvatarFallback>{learner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{learner.name}</CardTitle>
                <CardDescription>{learner.email}</CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={learner.status === "active" ? "default" : "outline"}>
                    {learner.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Joined on {new Date(learner.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
                <BookOpen className="h-5 w-5 text-primary mb-1" />
                <span className="text-xl font-bold">{learner.coursesCompleted}</span>
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
                <Award className="h-5 w-5 text-primary mb-1" />
                <span className="text-xl font-bold">{learner.certificates.length}</span>
                <span className="text-xs text-muted-foreground">Certificates</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
                <Coins className="h-5 w-5 text-primary mb-1" />
                <span className="text-xl font-bold">{learner.tokensEarned}</span>
                <span className="text-xs text-muted-foreground">Tokens</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
                <CreditCard className="h-5 w-5 text-primary mb-1" />
                <span className="text-xl font-bold">${learner.payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">Total Spent</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="p-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="font-medium">{learner.subscriptionPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={learner.subscriptionStatus === "active" ? "default" : "outline"}>
                          {learner.subscriptionStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Renewal Date:</span>
                        <span>{new Date(learner.subscriptionRenewal).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbon Footprint:</span>
                        <span className="font-medium">{learner.carbonFootprint} kg CO2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Courses Enrolled:</span>
                        <span>{learner.coursesEnrolled}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Active:</span>
                        <span>{new Date(learner.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {learner.assessments.slice(0, 3).map(assessment => (
                      <li key={assessment.id} className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>Completed assessment for <span className="font-medium">{assessment.courseName}</span></p>
                            <p className="text-sm text-muted-foreground">{new Date(assessment.completedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{assessment.score}/{assessment.maxScore}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Course</th>
                      <th className="py-3 px-4 text-left font-medium">Progress</th>
                      <th className="py-3 px-4 text-left font-medium">Completion Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learner.courses.map(course => (
                      <tr key={course.id} className="border-b">
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4">{course.progress}%</td>
                        <td className="py-3 px-4">
                          {course.completedAt ? new Date(course.completedAt).toLocaleDateString() : "In Progress"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={course.completedAt ? "default" : "outline"}>
                            {course.completedAt ? "Completed" : "In Progress"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-6">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Method</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learner.payments.map(payment => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">{new Date(payment.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">${payment.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{payment.method}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            payment.status === "completed" ? "default" : 
                            payment.status === "pending" ? "outline" : "destructive"
                          }>
                            {payment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learner.certificates.map(certificate => (
                  <Card key={certificate.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{certificate.title}</CardTitle>
                        <FileBadge className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Certificate</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="assessments" className="space-y-6">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Course</th>
                      <th className="py-3 px-4 text-left font-medium">Score</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learner.assessments.map(assessment => (
                      <tr key={assessment.id} className="border-b">
                        <td className="py-3 px-4">{assessment.courseName}</td>
                        <td className="py-3 px-4">{assessment.score}/{assessment.maxScore}</td>
                        <td className="py-3 px-4">{new Date(assessment.completedAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            assessment.score / assessment.maxScore >= 0.7 ? "default" : "destructive"
                          }>
                            {assessment.score / assessment.maxScore >= 0.7 ? "Pass" : "Fail"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-6">
              {learner.comments.length > 0 ? (
                <div className="space-y-4">
                  {learner.comments.map(comment => (
                    <Card key={comment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Rating: {Array(comment.rating).fill("★").join("")}
                            </CardTitle>
                            <CardDescription>
                              {new Date(comment.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteComment(comment.id)}
                            title="Delete comment"
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{comment.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No comments or ratings found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

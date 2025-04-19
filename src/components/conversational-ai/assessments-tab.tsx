
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { award } from "lucide-react";

export function AssessmentsTab() {
  // Mocked data for demonstration
  const assessments = [
    { 
      id: 1, 
      title: "Sustainability Fundamentals", 
      score: 85, 
      maxScore: 100,
      status: "Completed"
    },
    { 
      id: 2, 
      title: "Environmental Impact", 
      score: 45, 
      maxScore: 100,
      status: "In Progress"
    }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {assessments.map((assessment) => (
        <Card key={assessment.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <award className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">{assessment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={(assessment.score / assessment.maxScore) * 100} />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Score: {assessment.score}/{assessment.maxScore}</span>
                <span className="text-muted-foreground">Status: {assessment.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

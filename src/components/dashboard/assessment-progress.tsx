
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AssessmentProgress() {
  // Mocked data for demonstration
  const totalAssessments = 15;
  const completedAssessments = 12;
  const progressPercentage = (completedAssessments / totalAssessments) * 100;
  const averageScore = 85;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Assessments Taken</CardTitle>
        <CircleCheck className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <div className="text-2xl font-bold">{completedAssessments}/{totalAssessments}</div>
          <div className="text-sm font-medium">{averageScore}% avg</div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="text-xs text-muted-foreground mt-2">
          {totalAssessments - completedAssessments} assessments remaining
        </div>
      </CardContent>
    </Card>
  );
}

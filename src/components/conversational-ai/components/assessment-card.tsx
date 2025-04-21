
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { AssessmentCardProps } from "../types/assessment-types";

export function AssessmentCard({ assessment, onSelect }: AssessmentCardProps) {
  return (
    <Card className="min-w-[300px] max-w-[350px] flex-shrink-0">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{assessment.title}</CardTitle>
        </div>
        <Badge 
          variant={
            assessment.status === "completed" ? "default" : 
            assessment.status === "in-progress" ? "secondary" : "outline"
          }
        >
          {assessment.status === "completed" ? "Completed" : 
           assessment.status === "in-progress" ? "In Progress" : 
           "Not Started"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{assessment.description}</p>
        <p className="text-sm">
          Attempts: {assessment.attemptsUsed}/{assessment.maxAttempts}
        </p>
        <p className="text-sm">
          Passing Score: {assessment.passScore}%
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(assessment)}
          disabled={assessment.attemptsUsed >= assessment.maxAttempts && assessment.status !== "completed"}
          className="w-full"
        >
          {assessment.status === "completed" ? "Review" : "Start Assessment"}
        </Button>
      </CardFooter>
    </Card>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export function AssessmentsTab() {
  // Mocked data for demonstration
  const assessments = [
    { id: 1, title: "Sustainability Fundamentals", score: 85, passed: true },
    { id: 2, title: "Carbon Reduction Strategies", score: 65, passed: false }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {assessments.map((assessment) => (
        <Card key={assessment.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">{assessment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Score: {assessment.score}%</p>
              <span className={`font-semibold ${assessment.passed ? 'text-green-600' : 'text-red-600'}`}>
                {assessment.passed ? 'Passed' : 'Not Passed'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

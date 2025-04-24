
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { formatDate } from "../../shared/utils/format-utils";
import type { Assessment } from "../../types/learner.types";

interface LearnerAssessmentsProps {
  assessments: Assessment[];
}

export function LearnerAssessments({ assessments }: LearnerAssessmentsProps) {
  const columns = [
    {
      header: "Course",
      accessor: "courseName"
    },
    {
      header: "Date",
      accessor: (assessment: Assessment) => formatDate(assessment.date)
    },
    {
      header: "Score",
      accessor: (assessment: Assessment) => (
        <div>
          <span className="font-medium">{assessment.score}/{assessment.maxScore}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            ({Math.round((assessment.score / assessment.maxScore) * 100)}%)
          </span>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (assessment: Assessment) => (
        <Badge 
          variant={assessment.status === "passed" ? "default" : "destructive"}
          className="capitalize"
        >
          {assessment.status}
        </Badge>
      )
    },
    {
      header: "Attempts",
      accessor: "attempts"
    }
  ];

  return (
    <Card>
      <DataTable
        columns={columns}
        data={assessments}
        keyField="id"
        emptyMessage="No assessments taken yet"
      />
    </Card>
  );
}

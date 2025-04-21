
import { Assessment } from "../types/assessment-types";
import { AssessmentCard } from "./assessment-card";

interface AssessmentListProps {
  assessments: Assessment[];
  onSelectAssessment: (assessment: Assessment) => void;
}

export function AssessmentList({ assessments, onSelectAssessment }: AssessmentListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Available Assessments</h3>
      <div className="flex overflow-x-auto pb-4 space-x-4">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onSelect={onSelectAssessment}
          />
        ))}
      </div>
    </div>
  );
}

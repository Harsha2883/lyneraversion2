import React from "react";
import { useSubmissionReview } from "./hooks/useSubmissionReview";
import SubmissionReview from "./components/submission/SubmissionReview";
import SubmissionsTable from "./components/submission/SubmissionsTable";
import SubmissionFilters from "./components/submission/SubmissionFilters";

// Mock data kept for demonstration
const mockSubmissions = [
  {
    id: 1,
    studentId: "stu001",
    courseName: "GHG Fundamentals",
    learnerName: "John Doe",
    submittedAt: "2023-04-20T14:30:00",
    questions: 10,
    objectiveScore: 8,
    objectiveMax: 8,
    subjectiveScore: null,
    subjectiveReviewed: false,
    subjectiveAnswer: "GHG accounting is the process of measuring and reporting greenhouse gas emissions...",
  },
  {
    id: 2,
    studentId: "stu002",
    courseName: "GHG Fundamentals",
    learnerName: "Alice Smith",
    submittedAt: "2023-04-21T09:15:00",
    questions: 10,
    objectiveScore: 7,
    objectiveMax: 8,
    subjectiveScore: 9,
    subjectiveReviewed: true,
    subjectiveAnswer: "GHG accounting involves collecting and quantifying direct and indirect emissions...",
  },
];

export default function CheckAssessmentTab() {
  const {
    selectedSubmission,
    setSelectedSubmission,
    submissions,
    filters,
    toggleFilter,
    handleSaveScore,
    filteredSubmissions
  } = useSubmissionReview();
  
  // Initialize with mock data
  React.useEffect(() => {
    if (submissions.length === 0) {
      useSubmissionReview().setSubmissions(mockSubmissions);
    }
  }, [submissions.length]);

  return (
    <div className="space-y-6">
      {selectedSubmission !== null ? (
        <SubmissionReview
          submission={submissions.find(s => s.id === selectedSubmission)!}
          onClose={() => setSelectedSubmission(null)}
          onSaveScore={handleSaveScore}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assessment Submissions</h2>
            <SubmissionFilters 
              filters={filters}
              onToggleFilter={toggleFilter}
            />
          </div>
          <div className="mb-2 text-xs text-muted-foreground">
            Marks are converted to tokens automatically on review. Tokens can be redeemed for in-app purchases.
          </div>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <h3 className="mt-4 text-xl font-medium">No submissions to review</h3>
              <p className="mt-2 text-muted-foreground">
                When learners submit their assessments, they will appear here for review.
              </p>
            </div>
          ) : (
            <SubmissionsTable 
              submissions={filteredSubmissions}
              onReview={setSelectedSubmission}
            />
          )}
        </>
      )}
    </div>
  );
}

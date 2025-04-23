
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubmissionReview } from "./hooks/useSubmissionReview";
import SubmissionReview from "./components/submission/SubmissionReview";

// Mock data for demonstration
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

// Helper function for subjective max score
function subjectiveMaxScore() {
  // For demo, subjective out of 10 (can be dynamic)
  return 10;
}

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
            <div className="flex gap-2">
              <Button
                variant={filters.pending ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('pending')}
              >
                Pending Review
              </Button>
              <Button
                variant={filters.reviewed ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('reviewed')}
              >
                Reviewed
              </Button>
            </div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Learner</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Objective Marks</TableHead>
                  <TableHead>Subjective Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-mono text-xs">{submission.studentId}</TableCell>
                    <TableCell className="font-medium">{submission.learnerName}</TableCell>
                    <TableCell>{submission.courseName}</TableCell>
                    <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{submission.questions}</TableCell>
                    <TableCell>{submission.objectiveScore} / {submission.objectiveMax}</TableCell>
                    <TableCell>
                      {submission.subjectiveReviewed && submission.subjectiveScore !== null
                        ? `${submission.subjectiveScore} / ${subjectiveMaxScore()}`
                        : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {submission.subjectiveReviewed ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Reviewed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission.id)}
                      >
                        {submission.subjectiveReviewed ? "Edit" : "Review"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  );
}

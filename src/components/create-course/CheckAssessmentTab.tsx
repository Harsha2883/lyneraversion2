
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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

function subjectiveMaxScore() {
  // For demo, subjective out of 10 (can be dynamic)
  return 10;
}

interface SubmissionReviewProps {
  submission: typeof mockSubmissions[0];
  onClose: () => void;
  onSaveScore: (id: number, subjectiveScore: number) => void;
}

const SubmissionReview: React.FC<SubmissionReviewProps> = ({ submission, onClose, onSaveScore }) => {
  const [editScore, setEditScore] = useState<number | null>(submission.subjectiveScore);
  const [submitted, setSubmitted] = useState(false);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= subjectiveMaxScore()) {
      setEditScore(value);
    }
  };

  const handleSave = () => {
    if (editScore !== null) {
      onSaveScore(submission.id, editScore);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="border rounded-md p-6 bg-background max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-xl font-semibold mb-1">Review Submission</h3>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">Student ID:</span> {submission.studentId}
          </span>
          <span>
            <span className="font-medium text-foreground">Course:</span> {submission.courseName}
          </span>
          <span>
            <span className="font-medium text-foreground">Submission Date:</span> {new Date(submission.submittedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2">
          <span className="font-medium">Objective Questions</span>
        </div>
        <div className="bg-muted/50 p-4 rounded-md flex flex-col md:flex-row md:items-center gap-3">
          <span>
            <span className="font-semibold text-foreground">Score: </span>
            {submission.objectiveScore} / {submission.objectiveMax}
          </span>
          <span className="text-xs text-muted-foreground">Automatically graded</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2">
          <span className="font-medium">Subjective Question</span>
        </div>
        <div className="bg-muted/40 p-3 rounded mb-2 text-sm leading-relaxed">
          <span className="block mb-1 font-medium text-foreground">Learner's Answer:</span>
          {submission.subjectiveAnswer}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
          <label className="text-sm font-medium min-w-[120px] text-foreground">
            Subjective Marks:
          </label>
          <input
            type="number"
            min={0}
            max={subjectiveMaxScore()}
            className="border rounded px-4 py-2 w-32"
            value={editScore !== null ? editScore : ""}
            onChange={handleScoreChange}
            aria-label="Subjective Marks"
          />
          <span className="text-xs text-muted-foreground">
            Max: {subjectiveMaxScore()}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={editScore === null || submitted} onClick={handleSave}>
          <Check className="mr-2 h-4 w-4" />
          {submission.subjectiveReviewed ? "Update Score" : "Submit Review"}
        </Button>
      </div>
      {submitted && (
        <p className="mt-2 text-green-600 text-sm font-semibold">Score submitted!</p>
      )}
      <div className="mt-4 rounded bg-muted/50 p-3 text-xs text-muted-foreground">
        Marks are converted to tokens after review. Tokens are automatically credited to learners and can be used for in-app purchases.
      </div>
    </div>
  );
};

export default function CheckAssessmentTab() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const [filters, setFilters] = useState({
    reviewed: false,
    pending: true
  });

  // Save subjective score logic (would persist in DB in prod)
  const handleSaveScore = (id: number, subjectiveScore: number) => {
    setSubmissions(submissions =>
      submissions.map(sub =>
        sub.id === id
          ? { ...sub, subjectiveScore, subjectiveReviewed: true }
          : sub
      )
    );
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filters.reviewed && submission.subjectiveReviewed) return true;
    if (filters.pending && !submission.subjectiveReviewed) return true;
    return false;
  });

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
                onClick={() => setFilters(prev => ({ ...prev, pending: !prev.pending }))}
              >
                Pending Review
              </Button>
              <Button
                variant={filters.reviewed ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, reviewed: !prev.reviewed }))}
              >
                Reviewed
              </Button>
            </div>
          </div>
          <div className="mb-2 text-xs text-muted-foreground">Marks are converted to tokens automatically on review. Tokens can be redeemed for in-app purchases.</div>
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

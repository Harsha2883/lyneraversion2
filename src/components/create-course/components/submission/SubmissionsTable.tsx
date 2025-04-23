
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Submission } from "../../types/submission-types";

interface SubmissionsTableProps {
  submissions: Submission[];
  onReview: (id: number) => void;
}

// Helper function for subjective max score (can be moved to a constants file later)
const subjectiveMaxScore = () => 10;

export default function SubmissionsTable({ submissions, onReview }: SubmissionsTableProps) {
  return (
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
        {submissions.map((submission) => (
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
                onClick={() => onReview(submission.id)}
              >
                {submission.subjectiveReviewed ? "Edit" : "Review"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

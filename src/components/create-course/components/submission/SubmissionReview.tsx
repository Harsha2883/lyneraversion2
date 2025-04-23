
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Submission } from "../../types/submission-types";

interface SubmissionReviewProps {
  submission: Submission;
  onClose: () => void;
  onSaveScore: (id: number, subjectiveScore: number) => void;
}

export default function SubmissionReview({ 
  submission, 
  onClose, 
  onSaveScore 
}: SubmissionReviewProps) {
  const [editScore, setEditScore] = useState<number | null>(submission.subjectiveScore);
  const [submitted, setSubmitted] = useState(false);
  
  // For demo, subjective out of 10 (can be dynamic)
  const subjectiveMaxScore = 10;

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= subjectiveMaxScore) {
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
            max={subjectiveMaxScore}
            className="border rounded px-4 py-2 w-32"
            value={editScore !== null ? editScore : ""}
            onChange={handleScoreChange}
            aria-label="Subjective Marks"
          />
          <span className="text-xs text-muted-foreground">
            Max: {subjectiveMaxScore}
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
}

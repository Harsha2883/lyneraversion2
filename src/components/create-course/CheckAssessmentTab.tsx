
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileCheck } from "lucide-react";

// Mock data for demonstration
const mockSubmissions = [
  {
    id: 1,
    learnerName: "John Doe",
    submittedAt: "2023-04-20T14:30:00",
    questions: 10,
    objectiveScore: "7/8",
    subjectiveReviewed: false,
  },
  {
    id: 2,
    learnerName: "Alice Smith",
    submittedAt: "2023-04-21T09:15:00",
    questions: 10,
    objectiveScore: "8/8",
    subjectiveReviewed: true,
  },
  {
    id: 3,
    learnerName: "Bob Johnson",
    submittedAt: "2023-04-21T16:45:00",
    questions: 10,
    objectiveScore: "6/8",
    subjectiveReviewed: false,
  },
];

interface SubmissionReviewProps {
  submission: {
    id: number;
    learnerName: string;
    submittedAt: string;
    questions: number;
    objectiveScore: string;
    subjectiveReviewed: boolean;
  };
  onClose: () => void;
}

const SubmissionReview: React.FC<SubmissionReviewProps> = ({ submission, onClose }) => {
  const [subjectiveScores, setSubjectiveScores] = useState<{[key: number]: number}>({
    1: 0,
    2: 0
  });

  const handleScoreChange = (questionId: number, score: number) => {
    setSubjectiveScores(prev => ({
      ...prev,
      [questionId]: score
    }));
  };
  
  return (
    <div className="border rounded-md p-6 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Submission Review: {submission.learnerName}</h3>
        <span className="text-sm text-muted-foreground">
          Submitted: {new Date(submission.submittedAt).toLocaleString()}
        </span>
      </div>
      
      <div className="space-y-8">
        <div>
          <h4 className="font-medium mb-2">Objective Questions</h4>
          <div className="bg-muted/50 p-4 rounded-md">
            <p>Score: {submission.objectiveScore}</p>
            <p className="text-sm text-muted-foreground">
              Automatically graded based on correct answers
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Subjective Questions</h4>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="mb-2">
                <span className="font-medium">Question 1:</span> Explain the process of GHG accounting.
              </div>
              <div className="p-3 bg-muted/30 rounded-md mb-3">
                <p className="text-sm">
                  GHG accounting is the process of measuring and reporting greenhouse gas emissions. 
                  It involves quantifying direct emissions from owned sources, indirect emissions from 
                  purchased energy, and other indirect emissions from the value chain.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Score:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button 
                      key={score}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        subjectiveScores[1] === score ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
                      }`}
                      onClick={() => handleScoreChange(1, score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="mb-2">
                <span className="font-medium">Question 2:</span> Describe the impact of carbon trading on climate change.
              </div>
              <div className="p-3 bg-muted/30 rounded-md mb-3">
                <p className="text-sm">
                  Carbon trading creates economic incentives for reducing emissions by establishing a price on carbon.
                  Companies that reduce emissions can sell excess allowances to those who find it more expensive to reduce emissions.
                  This market-based approach helps achieve emission reductions at the lowest cost.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Score:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button 
                      key={score}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        subjectiveScores[2] === score ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
                      }`}
                      onClick={() => handleScoreChange(2, score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-8">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          disabled={Object.values(subjectiveScores).some(score => score === 0)}
          onClick={onClose}
        >
          <Check className="mr-2 h-4 w-4" />
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default function CheckAssessmentTab() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    reviewed: false,
    pending: true
  });

  const filteredSubmissions = mockSubmissions.filter(submission => {
    if (filters.reviewed && submission.subjectiveReviewed) return true;
    if (filters.pending && !submission.subjectiveReviewed) return true;
    return false;
  });
  
  return (
    <div className="space-y-6">
      {selectedSubmission !== null ? (
        <SubmissionReview 
          submission={mockSubmissions.find(s => s.id === selectedSubmission)!}
          onClose={() => setSelectedSubmission(null)} 
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
          
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <FileCheck className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-medium">No submissions to review</h3>
              <p className="mt-2 text-muted-foreground">
                When learners submit their assessments, they will appear here for review.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Learner</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Objective Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.learnerName}</TableCell>
                    <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{submission.questions}</TableCell>
                    <TableCell>{submission.objectiveScore}</TableCell>
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
                        {submission.subjectiveReviewed ? "View" : "Review"}
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

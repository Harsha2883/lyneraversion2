
import { useState } from "react";
import { Submission } from "../types/submission-types";

export function useSubmissionReview() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filters, setFilters] = useState({
    reviewed: false,
    pending: true
  });

  // Save subjective score logic (would persist in DB in prod)
  const handleSaveScore = (id: number, subjectiveScore: number) => {
    setSubmissions(currentSubmissions =>
      currentSubmissions.map(sub =>
        sub.id === id
          ? { ...sub, subjectiveScore, subjectiveReviewed: true }
          : sub
      )
    );
  };

  // Apply filters to submissions
  const filteredSubmissions = submissions.filter(submission => {
    if (filters.reviewed && submission.subjectiveReviewed) return true;
    if (filters.pending && !submission.subjectiveReviewed) return true;
    return false;
  });

  // Toggle filter settings
  const toggleFilter = (filterKey: 'reviewed' | 'pending') => {
    setFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  return {
    selectedSubmission,
    setSelectedSubmission,
    submissions,
    setSubmissions,
    filters,
    toggleFilter,
    handleSaveScore,
    filteredSubmissions
  };
}


import { useState, useMemo, useCallback } from "react";
import { Submission } from "../types/submission-types";
import { FILTER_TYPES } from "../constants/assessment-constants";

export function useSubmissionReview() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filters, setFilters] = useState({
    [FILTER_TYPES.REVIEWED]: false,
    [FILTER_TYPES.PENDING]: true
  });

  // Save subjective score logic (would persist in DB in prod)
  const handleSaveScore = useCallback((id: number, subjectiveScore: number) => {
    setSubmissions(currentSubmissions =>
      currentSubmissions.map(sub =>
        sub.id === id
          ? { ...sub, subjectiveScore, subjectiveReviewed: true }
          : sub
      )
    );
  }, []);

  // Apply filters to submissions - memoized to prevent recalculation
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      if (filters[FILTER_TYPES.REVIEWED] && submission.subjectiveReviewed) return true;
      if (filters[FILTER_TYPES.PENDING] && !submission.subjectiveReviewed) return true;
      return false;
    });
  }, [submissions, filters]);

  // Toggle filter settings
  const toggleFilter = useCallback((filterKey: 'reviewed' | 'pending') => {
    setFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  }, []);

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

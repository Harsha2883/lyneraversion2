
import React from "react";
import { Button } from "@/components/ui/button";

interface SubmissionFiltersProps {
  filters: {
    pending: boolean;
    reviewed: boolean;
  };
  onToggleFilter: (filterKey: 'pending' | 'reviewed') => void;
}

export default function SubmissionFilters({ filters, onToggleFilter }: SubmissionFiltersProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={filters.pending ? "default" : "outline"}
        size="sm"
        onClick={() => onToggleFilter('pending')}
      >
        Pending Review
      </Button>
      <Button
        variant={filters.reviewed ? "default" : "outline"}
        size="sm"
        onClick={() => onToggleFilter('reviewed')}
      >
        Reviewed
      </Button>
    </div>
  );
}

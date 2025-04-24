
import { useState } from "react";

export interface FilterState<T> {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  resetFilters: () => void;
}

export function useFilters<T>(initialFilters: T): FilterState<T> {
  const [filters, setFilters] = useState<T>(initialFilters);

  const setFilter = <K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, setFilter, resetFilters };
}

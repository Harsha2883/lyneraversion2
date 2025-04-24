
export type CourseFilters = {
  rating: number | null;
  priceRange: [number, number] | null;
  isFree: boolean;
  isForMembers: boolean;
  categories: string[];
  certifications: string[];
};

export type FilterProps = {
  filters: CourseFilters;
  setFilters: React.Dispatch<React.SetStateAction<CourseFilters>>;
};

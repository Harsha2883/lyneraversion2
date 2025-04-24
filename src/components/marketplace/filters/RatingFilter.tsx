
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { FilterProps } from "../types";

export function RatingFilter({ filters, setFilters }: FilterProps) {
  const handleRatingChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, rating: checked ? 3 : null }));
  };

  return (
    <div className="pt-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="r3plus" 
          checked={filters.rating === 3}
          onCheckedChange={(checked) => handleRatingChange(checked as boolean)}
        />
        <label
          htmlFor="r3plus"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          3+ Stars
        </label>
      </div>
    </div>
  );
}


import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORIES } from "../constants";
import { FilterProps } from "../types";

export function CategoryFilter({ filters, setFilters }: FilterProps) {
  const toggleCategory = (category: string) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected 
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  };

  return (
    <div className="pt-2 space-y-2">
      {CATEGORIES.map((category) => (
        <div key={category} className="flex items-center space-x-2">
          <Checkbox 
            id={`cat-${category}`}
            checked={filters.categories.includes(category)}
            onCheckedChange={() => toggleCategory(category)}
          />
          <label
            htmlFor={`cat-${category}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

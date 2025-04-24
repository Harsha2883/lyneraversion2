
import { Badge } from "@/components/ui/badge";
import { FilterProps } from "../types";
import { DEFAULT_PRICE_RANGE } from "../constants";

export function SelectedFilters({ filters, setFilters }: FilterProps) {
  const clearFilters = () => {
    setFilters({
      rating: null,
      priceRange: null,
      isFree: false,
      isForMembers: false,
      categories: [],
      certifications: []
    });
  };

  if (!(filters.rating !== null || 
       filters.isFree || 
       filters.isForMembers || 
       filters.priceRange !== null ||
       filters.categories.length > 0 ||
       filters.certifications.length > 0)) {
    return null;
  }

  return (
    <div className="pt-4 border-t">
      <div className="flex flex-wrap gap-2">
        {filters.rating !== null && (
          <Badge variant="secondary" className="flex gap-1 items-center">
            {filters.rating}+ Stars
            <button 
              onClick={() => setFilters(prev => ({ ...prev, rating: null }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        
        {filters.isFree && (
          <Badge variant="secondary" className="flex gap-1 items-center">
            Free
            <button 
              onClick={() => setFilters(prev => ({ ...prev, isFree: false }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        
        {filters.isForMembers && (
          <Badge variant="secondary" className="flex gap-1 items-center">
            Members
            <button 
              onClick={() => setFilters(prev => ({ ...prev, isForMembers: false }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        
        {filters.priceRange && (
          <Badge variant="secondary" className="flex gap-1 items-center">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
            <button 
              onClick={() => setFilters(prev => ({ ...prev, priceRange: null }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        
        {filters.categories.map(category => (
          <Badge key={category} variant="secondary" className="flex gap-1 items-center">
            {category}
            <button 
              onClick={() => setFilters(prev => ({
                ...prev,
                categories: prev.categories.filter(c => c !== category)
              }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
        
        {filters.certifications.map(cert => (
          <Badge key={cert} variant="secondary" className="flex gap-1 items-center">
            {cert}
            <button 
              onClick={() => setFilters(prev => ({
                ...prev,
                certifications: prev.certifications.filter(c => c !== cert)
              }))} 
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
        
        <button
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-primary ml-auto"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

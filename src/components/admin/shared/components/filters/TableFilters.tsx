
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions?: {
    name: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  className?: string;
}

export function TableFilters({ 
  searchValue, 
  onSearchChange, 
  filterOptions = [], 
  className = "" 
}: TableFiltersProps) {
  return (
    <div className={`flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 ${className}`}>
      <div className="flex items-center flex-1 space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search..." 
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>
      
      {filterOptions.map((filter, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Select value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Filter by ${filter.name}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}


import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, BadgeCheck } from "lucide-react";
import { CourseFilters as CourseFiltersType } from "@/pages/MarketplacePage";

interface CourseFiltersProps {
  filters: CourseFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<CourseFiltersType>>;
}

const categories = ["CSR", "ESG", "Climate", "Carbon"];
const certifications = ["ACTD", "EAHEA", "MEPSC", "Lynera", "Others"];

export function CourseFilters({ filters, setFilters }: CourseFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 25000]);
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values as [number, number]);
    setFilters(prev => ({
      ...prev,
      priceRange: values as [number, number]
    }));
  };
  
  const handleRatingChange = (rating: number | null) => {
    setFilters(prev => ({ ...prev, rating }));
  };
  
  const handlePriceTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      isFree: value === "free",
      isForMembers: value === "members",
      priceRange: value === "range" ? priceRange : null
    }));
  };
  
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
  
  const toggleCertification = (cert: string) => {
    setFilters(prev => {
      const isSelected = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: isSelected 
          ? prev.certifications.filter(c => c !== cert)
          : [...prev.certifications, cert]
      };
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <h3 className="font-medium text-lg">Filters</h3>
      
      <Accordion type="multiple" defaultValue={["rating", "price", "categories", "certifications"]} className="w-full">
        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="r3plus" 
                  checked={filters.rating === 3}
                  onCheckedChange={(checked) => 
                    handleRatingChange(checked ? 3 : null)
                  }
                />
                <label
                  htmlFor="r3plus"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  3+ Stars
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup 
              value={
                filters.isFree 
                  ? "free" 
                  : filters.isForMembers 
                    ? "members" 
                    : filters.priceRange ? "range" : ""
              }
              onValueChange={handlePriceTypeChange}
              className="space-y-2 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className="text-sm">Free</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range" className="text-sm">Price Range</Label>
              </div>
              
              {(filters.priceRange || filters.priceRange === null) && (
                <div className="px-6 pt-2 pb-4">
                  <div className="mb-4">
                    <Slider
                      disabled={!filters.priceRange}
                      defaultValue={[0, 25000]}
                      max={25000}
                      step={100}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      className={!filters.priceRange ? "opacity-50" : ""}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>{priceRange[0]}</div>
                    <div>{priceRange[1]}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="members" id="members" />
                <Label htmlFor="members" className="text-sm">For Members</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* Categories Filter */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 space-y-2">
              {categories.map((category) => (
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
          </AccordionContent>
        </AccordionItem>
        
        {/* Certifications Filter */}
        <AccordionItem value="certifications">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Certifications
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 space-y-2">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cert-${cert}`}
                    checked={filters.certifications.includes(cert)}
                    onCheckedChange={() => toggleCertification(cert)}
                  />
                  <label
                    htmlFor={`cert-${cert}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cert}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Selected Filters */}
      {(filters.rating !== null || 
       filters.isFree || 
       filters.isForMembers || 
       filters.priceRange !== null ||
       filters.categories.length > 0 ||
       filters.certifications.length > 0) && (
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.rating !== null && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                {filters.rating}+ Stars
                <button 
                  onClick={() => handleRatingChange(null)} 
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
                  onClick={() => handlePriceTypeChange("")} 
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
                  onClick={() => handlePriceTypeChange("")} 
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
                  onClick={() => handlePriceTypeChange("")} 
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
                  onClick={() => toggleCategory(category)} 
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
                  onClick={() => toggleCertification(cert)} 
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
            
            {/* Clear all filters button */}
            <button
              onClick={() => setFilters({
                rating: null,
                priceRange: null,
                isFree: false,
                isForMembers: false,
                categories: [],
                certifications: []
              })}
              className="text-xs text-muted-foreground hover:text-primary ml-auto"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

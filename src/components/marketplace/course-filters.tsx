
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, DollarSign, BadgeCheck } from "lucide-react";
import { RatingFilter } from "./filters/RatingFilter";
import { PriceFilter } from "./filters/PriceFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { CertificationFilter } from "./filters/CertificationFilter";
import { SelectedFilters } from "./filters/SelectedFilters";
import { FilterProps } from "./types";

export function CourseFilters({ filters, setFilters }: FilterProps) {
  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <h3 className="font-medium text-lg">Filters</h3>
      
      <Accordion type="multiple" defaultValue={["rating", "price", "categories", "certifications"]} className="w-full">
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RatingFilter filters={filters} setFilters={setFilters} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <PriceFilter filters={filters} setFilters={setFilters} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <CategoryFilter filters={filters} setFilters={setFilters} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="certifications">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Certifications
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CertificationFilter filters={filters} setFilters={setFilters} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <SelectedFilters filters={filters} setFilters={setFilters} />
    </div>
  );
}


import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";
import { FilterProps } from "../types";
import { DEFAULT_PRICE_RANGE } from "../constants";
import { useState } from "react";

export function PriceFilter({ filters, setFilters }: FilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);
  
  const handlePriceTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      isFree: value === "free",
      isForMembers: value === "members",
      priceRange: value === "range" ? priceRange : null
    }));
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    const priceTuple: [number, number] = [values[0], values[1]];
    setPriceRange(priceTuple);
    setFilters(prev => ({
      ...prev,
      priceRange: priceTuple
    }));
  };

  return (
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
  );
}

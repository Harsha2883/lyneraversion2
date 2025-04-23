
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ResourceCategory, ResourceType } from "./creator-e-library-content";

const CATEGORIES: ResourceCategory[] = [
  "CSR", 
  "ESG", 
  "AI", 
  "Carbon market", 
  "Sustainability", 
  "Other"
];

interface ResourceCategorySelectorProps {
  resourceType: ResourceType;
  onSelect: (category: ResourceCategory) => void;
  onBack: () => void;
}

export function ResourceCategorySelector({ 
  resourceType, 
  onSelect, 
  onBack 
}: ResourceCategorySelectorProps) {
  const typeLabel = 
    resourceType === "audio" ? "Audio" :
    resourceType === "video" ? "Video" : "Document";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack} 
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Select {typeLabel} Category</h2>
          <p className="text-muted-foreground">Choose a category for your {resourceType}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map(category => (
          <Card 
            key={category}
            className="p-4 cursor-pointer hover:border-primary transition-all flex items-center justify-center text-center h-24"
            onClick={() => onSelect(category)}
          >
            <span className="font-medium text-lg">{category}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

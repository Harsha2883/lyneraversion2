
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// These would typically come from your backend
const predefinedCategories = [
  "ESG",
  "AI in Healthcare",
  "Sustainability",
  "Net Zero",
  "Carbon Management",
  "Green Finance",
  "Digital Transformation",
  "Climate Tech",
];

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddNewCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    
    // Here you would typically make an API call to request the new category
    toast.info("Category suggestion submitted for admin review");
    setNewCategory("");
    setShowNewCategory(false);
  };

  return (
    <div className="space-y-2">
      {!showNewCategory ? (
        <div className="flex gap-2">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {predefinedCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowNewCategory(true)}
            title="Suggest new category"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleAddNewCategory}>Submit</Button>
          <Button variant="outline" onClick={() => setShowNewCategory(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

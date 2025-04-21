
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookCategory } from "./types/e-library-types";

interface EBookCategoriesProps {
  categories: BookCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export function EBookCategories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: EBookCategoriesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex-shrink-0"
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

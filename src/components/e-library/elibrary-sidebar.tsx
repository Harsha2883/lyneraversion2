
import { Input } from "@/components/ui/input";
import { BookCategory } from "./types/e-library-types";

const resourceTypes = [
  { type: "Pdf", color: "bg-muted", text: "text-gray-800" },
  { type: "Guide", color: "bg-muted", text: "text-gray-800" },
  { type: "Article", color: "bg-muted", text: "text-gray-800" },
  { type: "Video", color: "bg-muted", text: "text-gray-800" },
];

const tags = [
  "reporting", "frameworks", "corporate",
  "carbon credits", "offsetting", "trading",
  "implementation", "strategy", "templates",
  "emissions", "targets", "biodiversity", "markets", "ecosystems",
  "science-based", "climate"
];

interface ELibrarySidebarProps {
  categories: BookCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  search: string;
  setSearch: (val: string) => void;
}

export function ELibrarySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  search,
  setSearch
}: ELibrarySidebarProps) {
  return (
    <aside className="space-y-8 w-full">
      {/* Search */}
      <div>
        <Input
          placeholder="Search resources..."
          className="w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Categories */}
      <div>
        <h3 className="text-md font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map(category => (
            <li key={category.id}>
              <button
                className={`block w-full text-left px-2 py-1 rounded hover:bg-muted/80 transition ${selectedCategory === category.id ? "bg-muted font-bold" : "bg-transparent"}`}
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Resource Types */}
      <div>
        <h3 className="text-md font-semibold mb-2">Resource Types</h3>
        <ul className="space-y-1">
          {resourceTypes.map(rt => (
            <li key={rt.type}>
              <span className={`inline-block rounded px-2 text-xs py-1 ${rt.color} ${rt.text} bg-muted-foreground/10`}>
                {rt.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Popular Tags */}
      <div>
        <h3 className="text-md font-semibold mb-2">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

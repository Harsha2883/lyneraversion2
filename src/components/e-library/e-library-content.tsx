
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCategories, getBooksByCategory } from "./data/e-library-data";
import { EBook } from "./types/e-library-types";
import { ELibrarySidebar } from "./elibrary-sidebar";
import { EBooksList } from "./e-books-list";

export function ELibraryContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const categories = getAllCategories();
  // For now, get all books matching selectedCategory
  const allBooks = selectedCategory ? getBooksByCategory(selectedCategory) : categories.length > 0 ? categories.flatMap(cat => getBooksByCategory(cat.id)) : [];
  const books = allBooks.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.description.toLowerCase().includes(search.toLowerCase())
  );
  // For demo, sorting is not implemented

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Sidebar */}
      <div className="w-full md:max-w-xs flex-shrink-0">
        <ELibrarySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          search={search}
          setSearch={setSearch}
        />
      </div>
      {/* Main content with tabs and resource rows */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-transparent p-0 mb-2 border-b border-border w-full rounded-none flex">
              <TabsTrigger value="all" className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                All Resources
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                Recent Additions
              </TabsTrigger>
              <TabsTrigger value="popular" className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                Most Popular
              </TabsTrigger>
            </TabsList>
            <TabsContent value={tab}>
              <EBooksList books={books} />
            </TabsContent>
            {/* Could add different sorting/filtering for recent/popular */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

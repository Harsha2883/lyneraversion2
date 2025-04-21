
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EBookCategories } from "./e-book-categories";
import { EBooksList } from "./e-books-list";
import { EBookReader } from "./e-book-reader";
import { EBookConversation } from "./e-book-conversation";
import { getAllCategories, getBooksByCategory } from "./data/e-library-data";
import { EBook } from "./types/e-library-types";

export function ELibraryContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "reader" | "conversation">("list");
  
  const categories = getAllCategories();
  const books = selectedCategory ? getBooksByCategory(selectedCategory) : [];
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedBook(null);
    setViewMode("list");
  };
  
  const handleBookSelect = (book: EBook) => {
    setSelectedBook(book);
  };
  
  const handleViewBook = () => {
    if (selectedBook) {
      setViewMode("reader");
    }
  };
  
  const handleDownloadBook = () => {
    if (selectedBook) {
      // In a real app, this would trigger a download
      window.open(selectedBook.downloadUrl, "_blank");
    }
  };
  
  const handleConversationalBook = () => {
    if (selectedBook) {
      setViewMode("conversation");
    }
  };
  
  const handleBackToList = () => {
    if (viewMode === "reader" || viewMode === "conversation") {
      setViewMode("list");
    } else {
      setSelectedBook(null);
    }
  };
  
  return (
    <div className="space-y-6">
      {viewMode === "list" && (
        <>
          <EBookCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          
          {selectedCategory && (
            <EBooksList 
              books={books}
              selectedBook={selectedBook}
              onSelectBook={handleBookSelect}
              onViewBook={handleViewBook}
              onDownloadBook={handleDownloadBook}
              onConversationalBook={handleConversationalBook}
            />
          )}
        </>
      )}
      
      {viewMode === "reader" && selectedBook && (
        <EBookReader 
          book={selectedBook}
          onBack={handleBackToList}
        />
      )}
      
      {viewMode === "conversation" && selectedBook && (
        <EBookConversation 
          book={selectedBook}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

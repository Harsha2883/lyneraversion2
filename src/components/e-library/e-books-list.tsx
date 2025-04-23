
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EBook } from "./types/e-library-types";

// Sample mapping of categories to resource types/tags/icons for demo
const resourceType = (book: EBook): string => {
  if (book.title.toLowerCase().includes("guide")) return "Pdf";
  if (book.title.toLowerCase().includes("toolkit")) return "Guide";
  if (book.title.toLowerCase().includes("tutorial")) return "Video";
  if (book.title.toLowerCase().includes("pathways") || book.title.toLowerCase().includes("initiative")) return "Article";
  return "Pdf";
};

const fakeTags = (book: EBook): string[] => {
  // For demonstration, a few keywords as tags
  if (book.title.toLowerCase().includes("csr")) return ["implementation", "strategy", "templates"];
  if (book.title.toLowerCase().includes("biodiversity")) return ["biodiversity", "markets", "ecosystems"];
  if (book.title.toLowerCase().includes("targets")) return ["targets", "science-based", "climate"];
  if (book.title.toLowerCase().includes("net zero")) return ["strategy", "emissions", "targets"];
  if (book.title.toLowerCase().includes("carbon")) return ["carbon credits", "offsetting", "trading"];
  if (book.title.toLowerCase().includes("reporting")) return ["reporting", "frameworks", "corporate"];
  return [];
};

function formatFileSize(sizeMb: number) {
  return `${sizeMb.toFixed(1)} MB`;
}

function formatDate(d: string) {
  // Expect "YYYY-MM-DD"
  return d.split("-").reverse().join("/");
}

interface EBooksListProps {
  books: EBook[];
}

export function EBooksList({ books }: EBooksListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No resources found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {books.map(book => (
        <div key={book.id} className="border bg-card rounded-lg p-4 flex flex-col md:flex-row gap-3 items-start shadow-sm">
          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 items-center mb-1">
              <span className="font-semibold text-base">{book.title}</span>
              {/* Category, Resource type badges */}
              <Badge variant="secondary" className="capitalize">{book.category}</Badge>
              <Badge variant="outline" className="capitalize">{resourceType(book)}</Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-2 line-clamp-2">{book.description}</div>
            {/* Tag chips */}
            <div className="flex flex-wrap gap-1 mb-1">
              {fakeTags(book).map(tag => (
                <span key={tag} className="bg-muted rounded px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Added: {formatDate(book.publishedDate)}{book.pageCount ? ` • ${(book.pageCount * 0.013).toFixed(1)} MB` : ""}
            </div>
          </div>
          {/* Right: Download button */}
          <div className="flex-shrink-0 flex flex-row md:flex-col gap-2 md:items-end md:justify-between">
            <Button
              onClick={() => window.open(book.downloadUrl, "_blank")}
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
            >
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

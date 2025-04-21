
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EBook } from "./types/e-library-types";
import { Book, Download, MessageSquare } from "lucide-react";

interface EBooksListProps {
  books: EBook[];
  selectedBook: EBook | null;
  onSelectBook: (book: EBook) => void;
  onViewBook: () => void;
  onDownloadBook: () => void;
  onConversationalBook: () => void;
}

export function EBooksList({
  books,
  selectedBook,
  onSelectBook,
  onViewBook,
  onDownloadBook,
  onConversationalBook
}: EBooksListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No books found in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Available Books</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card 
            key={book.id}
            className={`cursor-pointer transition-all ${
              selectedBook?.id === book.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectBook(book)}
          >
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <Badge variant={book.isPremium ? "default" : "secondary"}>
                  {book.isPremium ? "Premium" : "Free"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
              <div 
                className="w-full h-40 bg-muted rounded-md mb-4 overflow-hidden"
                style={{
                  backgroundImage: `url(${book.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <p className="text-sm line-clamp-3">{book.description}</p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <div className="text-sm text-muted-foreground">
                {book.pageCount} pages • {book.category}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedBook && (
        <div className="bg-muted p-4 rounded-lg mt-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{selectedBook.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button onClick={onViewBook} className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              View E-Book
            </Button>
            
            <Button variant="outline" onClick={onDownloadBook} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            <Button variant="secondary" onClick={onConversationalBook} className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Conversational
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EBook } from "./types/e-library-types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EBookReaderProps {
  book: EBook;
  onBack: () => void;
}

export function EBookReader({ book, onBack }: EBookReaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">{book.title}</h2>
      </div>
      
      <div className="flex gap-4 text-sm text-muted-foreground">
        <div>Author: {book.author}</div>
        <div>{book.pageCount} pages</div>
        <div>Category: {book.category}</div>
      </div>
      
      <div className="bg-card border rounded-lg p-8 min-h-[60vh]">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="prose prose-sm max-w-full dark:prose-invert">
            <h1>{book.title}</h1>
            <h3>By {book.author}</h3>
            
            {book.content ? (
              <div dangerouslySetInnerHTML={{ __html: book.content }} />
            ) : (
              <div>
                <p className="text-lg">Sample content for demonstration purposes.</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <h2>Chapter 1</h2>
                
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

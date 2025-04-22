
import React from "react";
import { EBook } from "../types/e-library-types";

interface HeaderProps {
  book: EBook;
}

export function EBookConversationHeader({ book }: HeaderProps) {
  return (
    <div className="p-4 border-b bg-muted rounded-t-md">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-muted-foreground">{book.author}</p>
    </div>
  );
}

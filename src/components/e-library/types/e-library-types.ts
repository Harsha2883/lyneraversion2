
export interface BookCategory {
  id: string;
  name: string;
  description?: string;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  categoryId: string;
  coverImage: string;
  isPremium: boolean;
  pageCount: number;
  publishedDate: string;
  content?: string;
  downloadUrl: string;
}

export interface EBookCategoriesProps {
  categories: BookCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export interface EBooksListProps {
  books: EBook[];
  selectedBook: EBook | null;
  onSelectBook: (book: EBook) => void;
  onViewBook: () => void;
  onDownloadBook: () => void;
  onConversationalBook: () => void;
}

export interface EBookReaderProps {
  book: EBook;
  onBack: () => void;
}

export interface EBookConversationProps {
  book: EBook;
  onBack: () => void;
}


import { BookCategory, EBook } from "../types/e-library-types";

// Mock categories data
const categories: BookCategory[] = [
  {
    id: "sustainability",
    name: "Sustainability",
    description: "Books about environmental sustainability and conservation"
  },
  {
    id: "business",
    name: "Business & Economics",
    description: "Books on business strategies, economics, and management"
  },
  {
    id: "technology",
    name: "Technology",
    description: "Books on technology, programming, and digital transformation"
  },
  {
    id: "science",
    name: "Science",
    description: "Books on scientific research and discoveries"
  },
  {
    id: "personal-development",
    name: "Personal Development",
    description: "Books on self-improvement and skill development"
  },
  {
    id: "education",
    name: "Education",
    description: "Educational resources and teaching methodologies"
  }
];

// Mock e-books data
const books: EBook[] = [
  {
    id: "1",
    title: "Sustainable Future: A Comprehensive Guide",
    author: "Dr. Emily Green",
    description: "An in-depth exploration of sustainable practices and their impact on our future.",
    category: "Sustainability",
    categoryId: "sustainability",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: false,
    pageCount: 324,
    publishedDate: "2024-01-15",
    downloadUrl: "#"
  },
  {
    id: "2",
    title: "Business Strategies for a Changing World",
    author: "James Wilson",
    description: "Learn adaptive business strategies for success in rapidly evolving markets.",
    category: "Business & Economics",
    categoryId: "business",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: true,
    pageCount: 256,
    publishedDate: "2023-11-08",
    downloadUrl: "#"
  },
  {
    id: "3",
    title: "Advanced Machine Learning Concepts",
    author: "Dr. Robert Chen",
    description: "A deep dive into modern machine learning techniques and applications.",
    category: "Technology",
    categoryId: "technology",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: true,
    pageCount: 412,
    publishedDate: "2024-02-20",
    downloadUrl: "#"
  },
  {
    id: "4",
    title: "The Quantum Universe Explained",
    author: "Dr. Sophia Rahman",
    description: "An accessible guide to understanding quantum physics and its implications.",
    category: "Science",
    categoryId: "science",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: false,
    pageCount: 278,
    publishedDate: "2023-09-12",
    downloadUrl: "#"
  },
  {
    id: "5",
    title: "Mastering Emotional Intelligence",
    author: "Dr. Alex Johnson",
    description: "Develop your emotional intelligence to enhance relationships and career success.",
    category: "Personal Development",
    categoryId: "personal-development",
    coverImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: false,
    pageCount: 198,
    publishedDate: "2024-03-05",
    downloadUrl: "#"
  },
  {
    id: "6",
    title: "Modern Teaching Methodologies",
    author: "Prof. Maria Garcia",
    description: "Innovative approaches to education in the digital age.",
    category: "Education",
    categoryId: "education",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: true,
    pageCount: 240,
    publishedDate: "2023-12-18",
    downloadUrl: "#"
  },
  {
    id: "7",
    title: "Renewable Energy Solutions",
    author: "Michael Stevens",
    description: "Comprehensive guide to renewable energy technologies and implementation.",
    category: "Sustainability",
    categoryId: "sustainability",
    coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: true,
    pageCount: 356,
    publishedDate: "2024-01-30",
    downloadUrl: "#"
  },
  {
    id: "8",
    title: "Financial Management Principles",
    author: "Sarah Thompson",
    description: "Essential financial management strategies for individuals and organizations.",
    category: "Business & Economics",
    categoryId: "business",
    coverImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    isPremium: false,
    pageCount: 284,
    publishedDate: "2023-08-22",
    downloadUrl: "#"
  }
];

// Helper functions to get data
export const getAllCategories = (): BookCategory[] => {
  return categories;
};

export const getBooksByCategory = (categoryId: string): EBook[] => {
  return books.filter(book => book.categoryId === categoryId);
};

export const getBookById = (bookId: string): EBook | undefined => {
  return books.find(book => book.id === bookId);
};

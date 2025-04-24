
export interface CourseCreator {
  name: string;
  image?: string;
}

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: CourseCreator;
  category: string;
  price: string;
  duration: string;
  rating: number;
  isForMembers: boolean;
}

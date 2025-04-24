
import { Star } from "lucide-react";

interface CourseInfoProps {
  title: string;
  description: string;
  rating: number;
}

export function CourseInfo({ title, description, rating }: CourseInfoProps) {
  return (
    <div className="pb-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <div className="flex items-center text-amber-500 whitespace-nowrap">
          <Star className="h-4 w-4 fill-current" />
          <span className="ml-1 text-sm">{rating}</span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
    </div>
  );
}

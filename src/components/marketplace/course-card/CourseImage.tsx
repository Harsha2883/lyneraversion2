
import { Badge } from "@/components/ui/badge";

interface CourseImageProps {
  image: string;
  title: string;
  category: string;
  isForMembers: boolean;
}

export function CourseImage({ image, title, category, isForMembers }: CourseImageProps) {
  return (
    <div className="relative aspect-video overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
          {category}
        </Badge>
        {isForMembers && (
          <Badge variant="default" className="bg-primary/80 backdrop-blur-sm">
            Members
          </Badge>
        )}
      </div>
    </div>
  );
}

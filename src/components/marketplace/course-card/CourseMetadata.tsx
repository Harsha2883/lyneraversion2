
import { Clock } from "lucide-react";

interface CourseMetadataProps {
  duration: string;
  price: string;
  isForMembers: boolean;
}

export function CourseMetadata({ duration, price, isForMembers }: CourseMetadataProps) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <div className="flex items-center text-muted-foreground">
        <Clock className="h-4 w-4 mr-1" />
        {duration}
      </div>
      <div className={`font-medium ${isForMembers || price === "Free" ? "text-primary" : ""}`}>
        {price}
      </div>
    </div>
  );
}

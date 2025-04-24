
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CourseCreator } from "./types";

interface CreatorInfoProps {
  creator: CourseCreator;
}

export function CreatorInfo({ creator }: CreatorInfoProps) {
  return (
    <div className="flex items-center mb-3">
      <Avatar className="h-6 w-6 mr-2">
        <AvatarImage src={creator.image} alt={creator.name} />
        <AvatarFallback className="text-xs">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <span className="text-sm text-muted-foreground">{creator.name}</span>
    </div>
  );
}

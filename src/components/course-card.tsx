
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    image?: string;
  };
  categoryBadge: string;
  duration: string;
  enrolled?: number;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  creator,
  categoryBadge,
  duration,
  enrolled = 0
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105" 
        />
        <Badge variant="secondary" className="absolute top-2 right-2">
          {categoryBadge}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="h-6 w-6">
            <AvatarImage src={creator.image} alt={creator.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              <User className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{creator.name}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{duration}</span>
        </div>
        <Button size="sm" className="h-8">Enroll Now</Button>
      </CardFooter>
    </Card>
  );
}

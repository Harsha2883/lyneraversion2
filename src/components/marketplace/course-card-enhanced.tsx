import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CourseCardEnhancedProps {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    image?: string;
  };
  category: string;
  price: string;
  duration: string;
  rating: number;
  isForMembers: boolean;
}

export function CourseCardEnhanced({
  id,
  title,
  description,
  image,
  creator,
  category,
  price,
  duration,
  rating,
  isForMembers,
}: CourseCardEnhancedProps) {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/course/${id}`);
  };
  
  const handleEnroll = () => {
    toast.success(`Enrolled in "${title}"`);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
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
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center text-amber-500 whitespace-nowrap">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="pb-0 flex-grow">
        <div className="flex items-center mb-3">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={creator.image} alt={creator.name} />
            <AvatarFallback className="text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{creator.name}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className={`font-medium ${isForMembers || price === "Free" ? "text-primary" : ""}`}>
            {price}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleLearnMore}
        >
          Learn More
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={handleEnroll}
        >
          {price === "Free" ? "Enroll Now" : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CourseImage } from "./course-card/CourseImage";
import { CourseInfo } from "./course-card/CourseInfo";
import { CreatorInfo } from "./course-card/CreatorInfo";
import { CourseMetadata } from "./course-card/CourseMetadata";
import { CourseActions } from "./course-card/CourseActions";
import type { CourseCardProps } from "./course-card/types";

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
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <CourseImage 
        image={image} 
        title={title} 
        category={category} 
        isForMembers={isForMembers} 
      />
      
      <CardHeader className="pb-2">
        <CourseInfo 
          title={title} 
          description={description} 
          rating={rating} 
        />
      </CardHeader>
      
      <CardContent className="pb-0 flex-grow">
        <CreatorInfo creator={creator} />
        <CourseMetadata 
          duration={duration} 
          price={price} 
          isForMembers={isForMembers} 
        />
      </CardContent>
      
      <CardFooter>
        <CourseActions 
          id={id} 
          title={title} 
          price={price} 
        />
      </CardFooter>
    </Card>
  );
}

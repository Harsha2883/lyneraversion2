
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CourseActionsProps {
  id: string;
  title: string;
  price: string;
}

export function CourseActions({ id, title, price }: CourseActionsProps) {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/course/${id}`);
  };
  
  const handleEnroll = () => {
    toast.success(`Enrolled in "${title}"`);
  };

  return (
    <div className="flex gap-2 w-full">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 whitespace-nowrap"
        onClick={handleLearnMore}
      >
        Learn More
      </Button>
      <Button
        variant="default"
        size="sm"
        className="flex-1 whitespace-nowrap"
        onClick={handleEnroll}
      >
        {price === "Free" ? "Enroll Now" : "Buy Now"}
      </Button>
    </div>
  );
}

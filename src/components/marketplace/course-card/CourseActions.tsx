
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
    <div className="grid grid-cols-2 gap-2 w-full">
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleLearnMore}
        className="w-full truncate"
      >
        Learn More
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={handleEnroll}
        className="w-full truncate"
      >
        {price === "Free" ? "Enroll Now" : "Buy Now"}
      </Button>
    </div>
  );
}

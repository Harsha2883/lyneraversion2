
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LearnMoreButtonProps {
  id: string;
}

export function LearnMoreButton({ id }: LearnMoreButtonProps) {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate(`/course/${id}`);
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleLearnMore}
      className="w-full truncate"
    >
      Learn More
    </Button>
  );
}

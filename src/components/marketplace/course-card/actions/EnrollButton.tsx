
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EnrollButtonProps {
  title: string;
  price: string;
}

export function EnrollButton({ title, price }: EnrollButtonProps) {
  const handleEnroll = () => {
    toast.success(`Enrolled in "${title}"`);
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleEnroll}
      className="w-full truncate"
    >
      {price === "Free" ? "Enroll Now" : "Buy Now"}
    </Button>
  );
}

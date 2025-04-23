
import { ProfileFormData } from "@/types/profile";
import { toast } from "sonner";

export function useProfileValidation() {
  const validateProfile = (formData: ProfileFormData): boolean => {
    if (!formData.first_name || !formData.last_name) {
      console.error("First name and last name are required");
      toast.error("First name and last name are required");
      return false;
    }
    return true;
  };

  return { validateProfile };
}


import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { checkAvatarBucket, uploadAvatar } from "@/utils/profile-utils";

export function useProfileAvatar() {
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  const handleAvatarUpload = async (userId: string): Promise<string | null> => {
    if (!pendingAvatarFile) return null;

    try {
      console.log("Uploading avatar...");
      const uploadedUrl = await uploadAvatar(pendingAvatarFile, userId);
      
      if (uploadedUrl) {
        console.log("Avatar uploaded successfully:", uploadedUrl);
        return uploadedUrl;
      } else {
        console.error("Avatar upload failed");
        toast.error("Error uploading avatar");
        return null;
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error("Failed to upload avatar image");
      return null;
    }
  };

  return {
    pendingAvatarFile,
    setPendingAvatarFile,
    handleAvatarUpload
  };
}


import { ProfileFormData } from "@/types/profile";
import { Profile } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const mapProfileToFormData = (profile: Profile | null): ProfileFormData => {
  if (!profile) {
    return {
      first_name: "",
      last_name: "",
      gender: "",
      birthdate: undefined,
      profession: "",
      education: "",
      aspiration: "",
      social_media: {},
      avatar_url: "",
    };
  }

  return {
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    gender: profile.gender || "",
    birthdate: profile.birthdate ? new Date(profile.birthdate) : undefined,
    profession: profile.profession || "",
    education: profile.education || "",
    aspiration: profile.aspiration || "",
    social_media: profile.social_media || {},
    avatar_url: profile.avatar_url || "",
  };
};

export const formatBirthdate = (birthdate: Date | string | undefined): string | null => {
  if (!birthdate) return null;
  
  if (typeof birthdate === 'string') {
    return birthdate;
  }
  
  return birthdate.toISOString().split("T")[0];
};

export const checkAvatarBucket = async (): Promise<boolean> => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    return buckets?.some(bucket => bucket.name === 'avatars') || false;
  } catch (error) {
    console.error("Error checking storage buckets:", error);
    return false;
  }
};

export const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
  if (!file || !userId) return null;
  
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return null;
  }
};

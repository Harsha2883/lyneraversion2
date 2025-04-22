
import { ProfileFormData } from "@/types/profile";
import { Profile } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const mapProfileToFormData = (profile: Profile | null): ProfileFormData => {
  if (!profile) {
    console.log("No profile data provided for mapping");
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

  // Convert the string date from database to a Date object if it exists
  let birthdate: Date | undefined = undefined;
  if (profile.birthdate) {
    try {
      birthdate = new Date(profile.birthdate);
      console.log("Parsed birthdate:", birthdate);
      // Check if the date is valid
      if (isNaN(birthdate.getTime())) {
        console.error("Invalid date from profile:", profile.birthdate);
        birthdate = undefined;
      }
    } catch (error) {
      console.error("Error parsing birthdate:", error);
      birthdate = undefined;
    }
  }

  return {
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    gender: profile.gender || "",
    birthdate: birthdate,
    profession: profile.profession || "",
    education: profile.education || "",
    aspiration: profile.aspiration || "",
    social_media: profile.social_media || {},
    avatar_url: profile.avatar_url || "",
  };
};

export const formatBirthdate = (birthdate: Date | string | undefined): string | null => {
  if (!birthdate) return null;
  
  try {
    if (typeof birthdate === 'string') {
      // Try to parse the string as a date
      const date = new Date(birthdate);
      if (isNaN(date.getTime())) {
        console.error("Invalid date string:", birthdate);
        return null;
      }
      return date.toISOString().split("T")[0];
    }
    
    // Handle Date object
    return birthdate.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting birthdate:", error, birthdate);
    return null;
  }
};

export const checkAvatarBucket = async (): Promise<boolean> => {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error("Error checking storage buckets:", error);
      return false;
    }
    
    const avatarBucketExists = buckets?.some(bucket => bucket.name === 'avatars') || false;
    console.log("Avatar bucket exists:", avatarBucketExists);
    
    if (!avatarBucketExists) {
      console.log("Creating avatars bucket...");
      try {
        const { error: createError } = await supabase.storage.createBucket('avatars', {
          public: true
        });
        if (createError) {
          console.error("Error creating avatars bucket:", createError);
          return false;
        }
        console.log("Avatars bucket created successfully");
        return true;
      } catch (err) {
        console.error("Exception creating avatars bucket:", err);
        return false;
      }
    }
    
    return avatarBucketExists;
  } catch (error) {
    console.error("Exception checking storage buckets:", error);
    return false;
  }
};

export const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
  if (!file || !userId) {
    console.error("Missing file or userId for avatar upload");
    return null;
  }
  
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    
    console.log(`Uploading avatar for user ${userId} with file extension ${fileExt}`);
    
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    
    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw uploadError;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    
    console.log("Avatar uploaded successfully, public URL:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Exception uploading avatar:", error);
    return null;
  }
};

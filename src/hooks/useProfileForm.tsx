
import { useState, useEffect } from "react";
import { useAuth, Profile } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileFormData, ProfileFormState } from "@/types/profile";
import { mapProfileToFormData, formatBirthdate, checkAvatarBucket, uploadAvatar } from "@/utils/profile-utils";

export function useProfileForm() {
  const { profile, refreshProfile, user } = useAuth();
  const [state, setState] = useState<ProfileFormState>({
    formData: mapProfileToFormData(profile),
    saving: false,
    loading: true,
    error: null,
    editMode: false,
    pendingAvatarFile: null,
  });

  useEffect(() => {
    let mounted = true;
    
    const initializeForm = async () => {
      try {
        if (mounted) {
          setState(prev => ({ ...prev, loading: true, error: null }));
        }
        
        // Check for avatar bucket
        await checkAvatarBucket();
        
        if (profile && mounted) {
          console.log("Loading profile data:", profile);
          setState(prev => ({
            ...prev,
            formData: mapProfileToFormData(profile),
            loading: false,
          }));
        } else if (!user && mounted) {
          setState(prev => ({
            ...prev,
            error: "Please sign in to view your profile",
            loading: false,
          }));
        } else if (mounted) {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (err: any) {
        console.error("Profile form initialization error:", err);
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: "Error loading profile: " + err.message,
            loading: false,
          }));
        }
      }
    };
    
    initializeForm();
    
    return () => {
      mounted = false;
    };
  }, [profile, user]);

  const handleFieldChange = (field: string, value: any) => {
    console.log(`Updating field: ${field} with value:`, value);
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      }
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setState(prev => ({ ...prev, saving: true }));

    try {
      console.log("Starting profile save with user:", user?.id);
      
      if (!user?.id) {
        throw new Error("User ID is missing. Please sign in again.");
      }

      if (!profile?.id) {
        throw new Error("Profile ID is missing. Cannot save changes.");
      }

      let avatar_url = state.formData.avatar_url;

      // Handle avatar upload if there's a pending file
      if (state.pendingAvatarFile && user) {
        console.log("Uploading avatar...");
        const uploadedUrl = await uploadAvatar(state.pendingAvatarFile, user.id);
        if (uploadedUrl) {
          avatar_url = uploadedUrl;
          console.log("Avatar uploaded successfully:", avatar_url);
        } else {
          console.error("Avatar upload failed");
          toast.error("Error uploading avatar");
        }
      }

      // Format birthdate properly for database storage
      const formattedBirthdate = formatBirthdate(state.formData.birthdate);
      console.log("Formatted birthdate for save:", formattedBirthdate);

      const dataToSubmit = {
        first_name: state.formData.first_name,
        last_name: state.formData.last_name,
        gender: state.formData.gender,
        birthdate: formattedBirthdate,
        profession: state.formData.profession,
        education: state.formData.education,
        aspiration: state.formData.aspiration,
        social_media: state.formData.social_media,
        avatar_url,
      };

      console.log("Submitting profile data to database:", dataToSubmit);

      const { error, data } = await supabase
        .from("profiles")
        .update(dataToSubmit)
        .eq("id", profile.id)
        .select();

      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }

      console.log("Profile updated successfully:", data);

      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          avatar_url,
        },
        editMode: false,
        pendingAvatarFile: null,
        saving: false,
      }));

      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(`Error saving profile: ${error.message}`);
      setState(prev => ({ ...prev, saving: false }));
    }
  };

  const handleEdit = () => {
    setState(prev => ({ ...prev, editMode: true }));
  };

  const handleCancel = () => {
    setState(prev => ({
      ...prev,
      formData: mapProfileToFormData(profile),
      editMode: false,
      pendingAvatarFile: null,
    }));
  };

  const setAvatarFile = (file: File | null) => {
    setState(prev => ({ ...prev, pendingAvatarFile: file }));
  };

  const retry = () => {
    setState(prev => ({ ...prev, error: null, loading: true }));
    refreshProfile();
  };

  return {
    ...state,
    handleFieldChange,
    handleSave,
    handleEdit,
    handleCancel,
    setAvatarFile,
    retry,
  };
}

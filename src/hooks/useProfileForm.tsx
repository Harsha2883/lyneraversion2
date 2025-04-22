
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
        }
      } catch (err: any) {
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
      if (!profile?.id) {
        throw new Error("Profile ID is missing. Cannot save changes.");
      }

      let avatar_url = state.formData.avatar_url;

      // Handle avatar upload if there's a pending file
      if (state.pendingAvatarFile && user) {
        const uploadedUrl = await uploadAvatar(state.pendingAvatarFile, user.id);
        if (uploadedUrl) {
          avatar_url = uploadedUrl;
        } else {
          toast.error("Error uploading avatar");
        }
      }

      const dataToSubmit = {
        first_name: state.formData.first_name,
        last_name: state.formData.last_name,
        gender: state.formData.gender,
        birthdate: formatBirthdate(state.formData.birthdate),
        profession: state.formData.profession,
        education: state.formData.education,
        aspiration: state.formData.aspiration,
        social_media: state.formData.social_media,
        avatar_url,
      };

      const { error } = await supabase
        .from("profiles")
        .update(dataToSubmit)
        .eq("id", profile.id);

      if (error) throw error;

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

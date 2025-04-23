
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileFormData, ProfileFormState } from "@/types/profile";
import { mapProfileToFormData, formatBirthdate } from "@/utils/profile-utils";
import { useProfileAvatar } from "./useProfileAvatar";
import { useProfileValidation } from "./useProfileValidation";

export function useProfileForm() {
  const { profile, refreshProfile, user, session } = useAuth();
  const { pendingAvatarFile, setPendingAvatarFile, handleAvatarUpload } = useProfileAvatar();
  const { validateProfile } = useProfileValidation();

  const [state, setState] = useState<Omit<ProfileFormState, 'pendingAvatarFile'>>({
    formData: mapProfileToFormData(profile),
    saving: false,
    loading: true,
    error: null,
    editMode: false,
  });

  useEffect(() => {
    let mounted = true;
    
    const initializeForm = async () => {
      try {
        if (!mounted) return;
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        if (!session) {
          console.log("No active session found in useProfileForm");
          if (mounted) {
            setState(prev => ({
              ...prev,
              error: "Please sign in to view your profile",
              loading: false,
            }));
          }
          return;
        }

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
    return () => { mounted = false; };
  }, [profile, user, session]);

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
    
    if (!validateProfile(state.formData)) return;
    
    setState(prev => ({ ...prev, saving: true }));

    try {
      if (!session) throw new Error("No active session. Please sign in again.");
      if (!user?.id) throw new Error("User ID is missing. Please sign in again.");
      if (!profile?.id) throw new Error("Profile ID is missing. Cannot save changes.");

      const avatar_url = await handleAvatarUpload(user.id) || state.formData.avatar_url;
      const formattedBirthdate = formatBirthdate(state.formData.birthdate);

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

      const { error, data } = await supabase
        .from("profiles")
        .update(dataToSubmit)
        .eq("id", profile.id)
        .select();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          avatar_url: avatar_url || prev.formData.avatar_url,
        },
        editMode: false,
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
    }));
    setPendingAvatarFile(null);
  };

  const retry = () => {
    setState(prev => ({ ...prev, error: null, loading: true }));
    refreshProfile();
  };

  return {
    ...state,
    pendingAvatarFile,
    handleFieldChange,
    handleSave,
    handleEdit,
    handleCancel,
    setAvatarFile: setPendingAvatarFile,
    retry,
  };
}

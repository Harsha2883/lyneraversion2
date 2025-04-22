
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo } from "./sections/personal-info";
import { ProfessionalInfo } from "./sections/professional-info";
import { SocialMedia } from "./sections/social-media";
import { AvatarUpload } from "./avatar-upload";

export function ProfileForm() {
  const { profile, refreshProfile, user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    birthdate: undefined as Date | undefined,
    profession: "",
    education: "",
    aspiration: "",
    social_media: {} as Record<string, string>,
    avatar_url: "",
  });

  // Initialize form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        gender: profile.gender || "",
        birthdate: profile.birthdate ? new Date(profile.birthdate) : undefined,
        profession: profile.profession || "",
        education: profile.education || "",
        aspiration: profile.aspiration || "",
        social_media: profile.social_media || {},
        avatar_url: profile.avatar_url || "",
      });
      setLoading(false);
    }
  }, [profile]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Save functionality including image upload if needed
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      // Make sure we have a valid profile ID, otherwise we can't save
      if (!profile?.id) {
        throw new Error("Profile ID is missing. Cannot save changes.");
      }

      let avatar_url = formData.avatar_url;

      // If the user selected a new avatar, upload it now
      if (pendingAvatarFile && user) {
        const fileExt = pendingAvatarFile.name.split('.').pop();
        const filePath = `${user.id}/avatar.${fileExt}`;
        
        try {
          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, pendingAvatarFile, { upsert: true });
          
          if (uploadError) throw uploadError;
          
          // Get the public URL
          const { data: { publicUrl } } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);
          
          avatar_url = publicUrl;
        } catch (uploadError: any) {
          console.error("Avatar upload error:", uploadError);
          toast.error(`Error uploading avatar: ${uploadError.message}`);
          // Continue with the profile update even if the avatar upload fails
        }
      }

      // Prepare payload for update
      const dataToSubmit = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        birthdate: formData.birthdate
          ? (formData.birthdate instanceof Date
              ? formData.birthdate.toISOString().split("T")[0]
              : formData.birthdate)
          : null,
        profession: formData.profession,
        education: formData.education,
        aspiration: formData.aspiration,
        social_media: formData.social_media,
        avatar_url,
      };

      console.log("Updating profile with ID:", profile.id);
      console.log("Data to submit:", dataToSubmit);

      const { error } = await supabase
        .from("profiles")
        .update(dataToSubmit)
        .eq("id", profile.id);

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        avatar_url, // make sure image url is in state
      }));

      setEditMode(false);
      setPendingAvatarFile(null); // clear file picker

      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(`Error saving profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Button that toggles edit/view mode
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    // Rollback changes, reset fields to last saved values
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        gender: profile.gender || "",
        birthdate: profile.birthdate ? new Date(profile.birthdate) : undefined,
        profession: profile.profession || "",
        education: profile.education || "",
        aspiration: profile.aspiration || "",
        social_media: profile.social_media || {},
        avatar_url: profile.avatar_url || "",
      });
    }
    setPendingAvatarFile(null);
    setEditMode(false);
  };

  if (loading && !profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading profile data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarUpload
            editMode={editMode}
            avatarUrl={pendingAvatarFile ? URL.createObjectURL(pendingAvatarFile) : (formData.avatar_url || "")}
            onSelectFile={(file) => {
              if (editMode) setPendingAvatarFile(file);
            }}
          />
          <PersonalInfo
            firstName={formData.first_name}
            lastName={formData.last_name}
            gender={formData.gender}
            birthdate={formData.birthdate}
            onFieldChange={(field, value) => handleFieldChange(field, value)}
            editMode={editMode}
          />
          <ProfessionalInfo
            profession={formData.profession}
            education={formData.education}
            aspiration={formData.aspiration}
            onFieldChange={handleFieldChange}
            editMode={editMode}
          />
          <SocialMedia
            socialMedia={formData.social_media}
            onFieldChange={handleFieldChange}
            editMode={editMode}
          />
        </CardContent>
        <CardFooter>
          {!editMode ? (
            <Button type="button" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="secondary" className="ml-2" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}

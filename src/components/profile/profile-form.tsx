
import { useRef, useState } from "react";
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
  const [editMode, setEditMode] = useState(false);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  // Set initial form data (convert dates as required)
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    gender: profile?.gender || "",
    birthdate: profile?.birthdate ? new Date(profile.birthdate) : undefined,
    profession: profile?.profession || "",
    education: profile?.education || "",
    aspiration: profile?.aspiration || "",
    social_media: profile?.social_media || {},
    avatar_url: profile?.avatar_url || "",
  });

  // Update form data when profile changes in case of refresh
  // (Prevents stale data after update)
  const prevProfileId = useRef(profile?.id);
  if (profile && prevProfileId.current !== profile?.id) {
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
    prevProfileId.current = profile.id;
  }

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
      let avatar_url = formData.avatar_url;

      // If the user selected a new avatar, upload it now
      if (pendingAvatarFile && user) {
        const fileExt = pendingAvatarFile.name.split('.').pop();
        const filePath = `${user.id}/avatar.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, pendingAvatarFile, { upsert: true });
        if (uploadError) throw uploadError;
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        avatar_url = publicUrl;
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

      const { error } = await supabase
        .from("profiles")
        .update(dataToSubmit)
        .eq("id", profile?.id);

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
      toast.error(error.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // Button that toggles edit/view mode
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    // Rollback changes, reset fields to last saved values
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      gender: profile?.gender || "",
      birthdate: profile?.birthdate ? new Date(profile.birthdate) : undefined,
      profession: profile?.profession || "",
      education: profile?.education || "",
      aspiration: profile?.aspiration || "",
      social_media: profile?.social_media || {},
      avatar_url: profile?.avatar_url || "",
    });
    setPendingAvatarFile(null);
    setEditMode(false);
  };

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


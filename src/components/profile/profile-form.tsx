
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormError, ProfileFormLoading } from "./states/profile-form-states";
import { FormActions } from "./form-actions";
import { AvatarSection } from "./sections/AvatarSection";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { ProfessionalInfoSection } from "./sections/ProfessionalInfoSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";

export function ProfileForm() {
  const {
    formData,
    loading,
    saving,
    error,
    editMode,
    pendingAvatarFile,
    handleFieldChange,
    handleSave,
    handleEdit,
    handleCancel,
    setAvatarFile,
    retry
  } = useProfileForm();

  if (loading) {
    return <ProfileFormLoading />;
  }

  if (error) {
    return <ProfileFormError error={error} onRetry={retry} />;
  }

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarSection
            editMode={editMode}
            avatarUrl={pendingAvatarFile ? URL.createObjectURL(pendingAvatarFile) : (formData.avatar_url || "")}
            onSelectFile={(file) => {
              if (editMode) setAvatarFile(file);
            }}
          />
          <PersonalInfoSection
            firstName={formData.first_name}
            lastName={formData.last_name}
            gender={formData.gender}
            birthdate={formData.birthdate instanceof Date ? formData.birthdate : (formData.birthdate ? new Date(formData.birthdate) : undefined)}
            editMode={editMode}
            onFieldChange={handleFieldChange}
          />
          <ProfessionalInfoSection
            profession={formData.profession}
            education={formData.education}
            aspiration={formData.aspiration}
            editMode={editMode}
            onFieldChange={handleFieldChange}
          />
          <SocialMediaSection
            socialMedia={formData.social_media}
            onFieldChange={handleFieldChange}
            editMode={editMode}
          />
        </CardContent>
        <FormActions 
          editMode={editMode} 
          saving={saving} 
          onEdit={handleEdit} 
          onCancel={handleCancel} 
        />
      </Card>
    </form>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfo } from "./sections/personal-info";
import { ProfessionalInfo } from "./sections/professional-info";
import { SocialMedia } from "./sections/social-media";
import { AvatarUpload } from "./avatar-upload";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormError, ProfileFormLoading } from "./states/profile-form-states";
import { FormActions } from "./form-actions";

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
          <AvatarUpload
            editMode={editMode}
            avatarUrl={pendingAvatarFile ? URL.createObjectURL(pendingAvatarFile) : (formData.avatar_url || "")}
            onSelectFile={(file) => {
              if (editMode) setAvatarFile(file);
            }}
          />
          <PersonalInfo
            firstName={formData.first_name}
            lastName={formData.last_name}
            gender={formData.gender}
            birthdate={formData.birthdate instanceof Date ? formData.birthdate : (formData.birthdate ? new Date(formData.birthdate) : undefined)}
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

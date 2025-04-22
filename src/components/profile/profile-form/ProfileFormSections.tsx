
import { AvatarSection } from "../sections/AvatarSection";
import { PersonalInfoSection } from "../sections/PersonalInfoSection";
import { ProfessionalInfoSection } from "../sections/ProfessionalInfoSection";
import { SocialMediaSection } from "../sections/SocialMediaSection";
import { ProfileFormData } from "@/types/profile";

interface ProfileFormSectionsProps {
  formData: ProfileFormData;
  editMode: boolean;
  pendingAvatarFile: File | null;
  setAvatarFile: (file: File | null) => void;
  handleFieldChange: (field: string, value: any) => void;
}

export function ProfileFormSections({
  formData,
  editMode,
  pendingAvatarFile,
  setAvatarFile,
  handleFieldChange,
}: ProfileFormSectionsProps) {
  return (
    <>
      <AvatarSection
        editMode={editMode}
        avatarUrl={pendingAvatarFile ? URL.createObjectURL(pendingAvatarFile) : (formData.avatar_url || "")}
        onSelectFile={file => {
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
    </>
  );
}

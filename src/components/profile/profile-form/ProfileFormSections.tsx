import { AvatarSection } from "../sections/AvatarSection";
import { PersonalInfoSection } from "../sections/PersonalInfoSection";
import { ProfessionalInfoSection } from "../sections/ProfessionalInfoSection";
import { SocialMediaSection } from "../sections/SocialMediaSection";
import { ReviewsList } from "../reviews/ReviewsList";
import { StarRating } from "../reviews/StarRating";
import { ProfileFormData } from "@/types/profile";
import { useAuth } from "@/hooks/useAuth";

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
  const { profile } = useAuth();
  
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">{formData.first_name} {formData.last_name}</h2>
        {formData.average_rating && (
          <div className="flex items-center gap-2">
            <StarRating rating={formData.average_rating} readonly />
            <span className="text-sm text-muted-foreground">
              ({formData.total_reviews} reviews)
            </span>
          </div>
        )}
      </div>
      
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
      
      {profile?.id && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          <ReviewsList 
            creatorId={profile.id} 
            isOwnProfile={true}
          />
        </div>
      )}
    </>
  );
}

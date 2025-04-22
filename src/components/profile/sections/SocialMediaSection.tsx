
import { SocialMedia } from "./social-media";

interface SocialMediaSectionProps {
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  editMode: boolean;
  onFieldChange: (field: string, value: any) => void;
}

export function SocialMediaSection({
  socialMedia,
  editMode,
  onFieldChange
}: SocialMediaSectionProps) {
  return (
    <SocialMedia
      socialMedia={socialMedia}
      onFieldChange={onFieldChange}
      editMode={editMode}
    />
  );
}

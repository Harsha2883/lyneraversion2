
import { AvatarUpload } from "../avatar-upload";

interface AvatarSectionProps {
  editMode: boolean;
  avatarUrl: string;
  onSelectFile: (file: File) => void;
}

export function AvatarSection({ editMode, avatarUrl, onSelectFile }: AvatarSectionProps) {
  return (
    <AvatarUpload
      editMode={editMode}
      avatarUrl={avatarUrl}
      onSelectFile={onSelectFile}
    />
  );
}

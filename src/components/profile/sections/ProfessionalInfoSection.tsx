
import { ProfessionalInfo } from "./professional-info";

interface ProfessionalInfoSectionProps {
  profession: string;
  education: string;
  aspiration: string;
  editMode: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export function ProfessionalInfoSection({
  profession,
  education,
  aspiration,
  editMode,
  onFieldChange
}: ProfessionalInfoSectionProps) {
  return (
    <ProfessionalInfo
      profession={profession}
      education={education}
      aspiration={aspiration}
      editMode={editMode}
      onFieldChange={onFieldChange}
    />
  );
}

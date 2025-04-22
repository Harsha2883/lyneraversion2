
import { PersonalInfo } from "./personal-info";

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date | undefined;
  editMode: boolean;
  onFieldChange: (field: string, value: any) => void;
}

export function PersonalInfoSection({
  firstName,
  lastName,
  gender,
  birthdate,
  editMode,
  onFieldChange
}: PersonalInfoSectionProps) {
  return (
    <PersonalInfo
      firstName={firstName}
      lastName={lastName}
      gender={gender}
      birthdate={birthdate}
      onFieldChange={onFieldChange}
      editMode={editMode}
    />
  );
}

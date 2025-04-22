
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfessionalInfoProps {
  profession: string;
  education: string;
  aspiration: string;
  onFieldChange: (field: string, value: string) => void;
  editMode: boolean;
}

export function ProfessionalInfo({ 
  profession, 
  education, 
  aspiration, 
  onFieldChange,
  editMode
}: ProfessionalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Professional Information</h3>
      <div className="space-y-2">
        <Label htmlFor="profession">Profession</Label>
        <Input
          id="profession"
          value={profession}
          onChange={(e) => onFieldChange("profession", e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          value={education}
          onChange={(e) => onFieldChange("education", e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="aspiration">Career Aspiration</Label>
        <Input
          id="aspiration"
          value={aspiration}
          onChange={(e) => onFieldChange("aspiration", e.target.value)}
          disabled={!editMode}
        />
      </div>
    </div>
  );
}


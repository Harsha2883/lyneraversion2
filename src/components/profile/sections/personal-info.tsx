
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date | undefined;
  onFieldChange: (field: string, value: any) => void;
  editMode: boolean;
}

export function PersonalInfo({ 
  firstName, 
  lastName, 
  gender, 
  birthdate, 
  onFieldChange,
  editMode
}: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onFieldChange("first_name", e.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onFieldChange("last_name", e.target.value)}
            disabled={!editMode}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        {editMode ? (
          <Select
            value={gender}
            onValueChange={(value) => onFieldChange("gender", value)}
            disabled={!editMode}
          >
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="gender"
            value={gender}
            disabled={true}
          />
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthdate">Date of Birth</Label>
        <DatePicker
          date={birthdate}
          onSelect={(date) => {
            if (editMode) onFieldChange("birthdate", date)
          }}
          disabled={!editMode}
        />
      </div>
    </div>
  );
}

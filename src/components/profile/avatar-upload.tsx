
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";

interface AvatarUploadProps {
  editMode: boolean
  avatarUrl: string
  onSelectFile?: (file: File) => void
}

export function AvatarUpload({ editMode, avatarUrl, onSelectFile }: AvatarUploadProps) {
  // This component just provides a preview and file input.
  // The file is passed up to parent but NOT uploaded here
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || ""} />
        <AvatarFallback className="bg-primary/10">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      {editMode && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="avatar" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Change Avatar</span>
            </div>
            <input
              id="avatar"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={e => {
                if (onSelectFile && e.target.files?.[0]) {
                  onSelectFile(e.target.files[0]);
                }
              }}
              disabled={!editMode}
            />
          </Label>
        </div>
      )}
    </div>
  );
}


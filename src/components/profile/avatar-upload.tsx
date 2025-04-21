
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";
import { toast } from "sonner";

export function AvatarUpload() {
  const { profile, user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (!file || !user) return;

      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success("Avatar updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={profile?.avatar_url || ""} />
        <AvatarFallback className="bg-primary/10">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>

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
            onChange={handleUpload}
            disabled={isUploading}
          />
        </Label>
        {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
      </div>
    </div>
  );
}

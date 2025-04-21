
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialMediaProps {
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

export function SocialMedia({ socialMedia, onFieldChange }: SocialMediaProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Social Media Links</h3>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={socialMedia?.linkedin || ''}
          onChange={(e) => 
            onFieldChange('social_media', { 
              ...socialMedia, 
              linkedin: e.target.value 
            })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          id="twitter"
          value={socialMedia?.twitter || ''}
          onChange={(e) => 
            onFieldChange('social_media', { 
              ...socialMedia, 
              twitter: e.target.value 
            })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={socialMedia?.github || ''}
          onChange={(e) => 
            onFieldChange('social_media', { 
              ...socialMedia, 
              github: e.target.value 
            })
          }
        />
      </div>
    </div>
  );
}

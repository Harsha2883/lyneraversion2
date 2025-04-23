
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ResourceType, ResourceCategory } from "./creator-e-library-content";

export interface ResourceFormProps {
  resourceType: ResourceType;
  category: ResourceCategory;
  onSubmitted: () => void;
  onCancel: () => void;
}

export function ResourceForm({ resourceType, category, onSubmitted, onCancel }: ResourceFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Resource created successfully");
      onSubmitted();
    } catch (error) {
      toast.error("Failed to create resource");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Create {resourceType} resource in {category}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Enter ${resourceType} title`}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this resource"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Upload {resourceType}</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept={getAcceptTypes(resourceType)}
          />
          <p className="text-sm text-muted-foreground">
            {getFileTypeHelp(resourceType)}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="premium"
            checked={isPremium}
            onCheckedChange={setIsPremium}
          />
          <Label htmlFor="premium">Premium resource</Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Resource"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Helper functions for file upload
function getAcceptTypes(type: ResourceType): string {
  switch (type) {
    case "audio":
      return ".mp3,.wav,.ogg,.flac";
    case "video":
      return ".mp4,.webm,.mov";
    case "document":
      return ".pdf,.doc,.docx,.ppt,.pptx";
    default:
      return "*/*";
  }
}

function getFileTypeHelp(type: ResourceType): string {
  switch (type) {
    case "audio":
      return "Supported formats: MP3, WAV, OGG, FLAC";
    case "video":
      return "Supported formats: MP4, WebM, MOV";
    case "document":
      return "Supported formats: PDF, DOC, DOCX, PPT, PPTX";
    default:
      return "Upload your file";
  }
}

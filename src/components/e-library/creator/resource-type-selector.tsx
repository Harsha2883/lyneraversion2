
import { FileAudio, FileText, Video } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceType } from "./creator-e-library-content";

interface ResourceTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function ResourceTypeCard({ title, description, icon, onClick }: ResourceTypeCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:border-primary transition-all" 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

interface ResourceTypeSelectorProps {
  onSelect: (type: ResourceType) => void;
}

export function ResourceTypeSelector({ onSelect }: ResourceTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Select Resource Type</h2>
        <p className="text-muted-foreground">Choose the type of resource you want to upload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResourceTypeCard
          title="Audio"
          description="Upload podcasts, interviews, lectures"
          icon={<FileAudio className="h-8 w-8 text-primary" />}
          onClick={() => onSelect("audio")}
        />
        <ResourceTypeCard
          title="Video"
          description="Upload tutorials, presentations, courses"
          icon={<Video className="h-8 w-8 text-primary" />}
          onClick={() => onSelect("video")}
        />
        <ResourceTypeCard
          title="Document"
          description="Upload PDFs, research papers, case studies"
          icon={<FileText className="h-8 w-8 text-primary" />}
          onClick={() => onSelect("document")}
        />
      </div>
    </div>
  );
}

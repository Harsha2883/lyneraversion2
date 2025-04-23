
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileAudio, FileText, Video, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResourceType } from "./creator-e-library-content";
import { Resource } from "./types/resource-types";
import { ShareResourceModal } from "./share-resource-modal";

interface ResourcesListProps {
  resources: Resource[];
}

export function ResourcesList({ resources = [] }: ResourcesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceToShare, setResourceToShare] = useState<Resource | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Filter resources based on search term
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleShareClick = (resource: Resource) => {
    setResourceToShare(resource);
    setIsShareModalOpen(true);
  };
  
  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "audio":
        return <FileAudio className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Resources</h2>
        <div className="w-1/3">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {resources.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <h3 className="font-medium text-lg">No resources yet</h3>
          <p className="text-muted-foreground">
            Add resources from the Create Resource tab
          </p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <h3 className="font-medium text-lg">No matching resources</h3>
          <p className="text-muted-foreground">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getResourceTypeIcon(resource.type)}
                      <span className="capitalize">{resource.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>
                    <Badge variant={resource.isPremium ? "default" : "outline"}>
                      {resource.isPremium ? "Premium" : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(resource.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShareClick(resource)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {resourceToShare && (
        <ShareResourceModal
          resource={resourceToShare}
          open={isShareModalOpen}
          onOpenChange={setIsShareModalOpen}
        />
      )}
    </div>
  );
}

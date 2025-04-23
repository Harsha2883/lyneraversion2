
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Resource } from "./creator-e-library-content";
import { Facebook, MessageSquare, Mail, Link } from "lucide-react";

interface ShareResourceModalProps {
  resource: Resource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareResourceModal({ 
  resource, 
  open, 
  onOpenChange 
}: ShareResourceModalProps) {
  const resourceUrl = `${window.location.origin}/library/${resource.id}`;
  
  const shareText = `Check out this ${resource.type} about ${resource.category}: ${resource.title}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(resourceUrl);
    toast.success("Link copied to clipboard");
  };
  
  const handleShare = (platform: string) => {
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resourceUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${resourceUrl}`)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(`Resource: ${resource.title}`)}&body=${encodeURIComponent(`${shareText}\n\n${resourceUrl}`)}`;
        break;
      default:
        return;
    }
    
    // Open in a new window
    window.open(shareUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Resource</DialogTitle>
          <DialogDescription>
            Share this {resource.type} resource with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="grid flex-1 gap-2">
            <Input
              readOnly
              value={resourceUrl}
            />
          </div>
          <Button size="sm" variant="secondary" onClick={handleCopyLink}>
            <Link className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium">Share on:</h4>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2 text-blue-600" />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleShare("whatsapp")}
            >
              <MessageSquare className="h-4 w-4 mr-2 text-green-600" />
              WhatsApp
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleShare("email")}
            >
              <Mail className="h-4 w-4 mr-2 text-gray-600" />
              Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

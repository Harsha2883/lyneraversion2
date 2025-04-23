
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { Resource } from "./types/resource-types";
import { toast } from "sonner";

interface ShareResourceModalProps {
  resource: Resource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareResourceModal({ resource, open, onOpenChange }: ShareResourceModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://yourdomain.com/resources/${resource.id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Check out this resource: ${resource.title}`);
    const body = encodeURIComponent(`I thought you might be interested in this resource:\n\n${resource.title}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share "{resource.title}"</DialogTitle>
          <DialogDescription>
            Share this {resource.type} resource with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button size="icon" variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <DialogFooter className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={shareByEmail} className="gap-2">
            <Mail className="h-4 w-4" />
            Share by Email
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

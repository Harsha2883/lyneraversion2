
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface ShareButtonsProps {
  shareUrl: string;
  shareText: string;
}

export function ShareButtons({ shareUrl, shareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

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

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareByEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={shareUrl} readOnly className="flex-1" />
        <Button size="icon" variant="outline" onClick={copyToClipboard}>
          <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex gap-2" onClick={shareToFacebook}>
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </Button>
        <Button variant="outline" size="sm" className="flex gap-2" onClick={shareToTwitter}>
          <Twitter className="h-4 w-4" />
          <span>Twitter</span>
        </Button>
        <Button variant="outline" size="sm" className="flex gap-2" onClick={shareToLinkedin}>
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </Button>
        <Button variant="outline" size="sm" className="flex gap-2" onClick={shareByEmail}>
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </Button>
      </div>
    </div>
  );
}

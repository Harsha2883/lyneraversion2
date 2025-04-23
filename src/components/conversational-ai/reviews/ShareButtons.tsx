
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Mail, Share } from "lucide-react";

interface ShareButtonsProps {
  shareText: string;
  shareUrl: string;
}

export function ShareButtons({ shareText, shareUrl }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    let shareUrlWithParams;
    switch (platform) {
      case 'facebook':
        shareUrlWithParams = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareUrlWithParams = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrlWithParams = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: shareText,
            url: shareUrl
          });
          return;
        }
        break;
    }
    if (shareUrlWithParams) {
      window.open(shareUrlWithParams, '_blank');
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Share this course</label>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}>
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}>
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare('email')}>
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare('native')}>
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

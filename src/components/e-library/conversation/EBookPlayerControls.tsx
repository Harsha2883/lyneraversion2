
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";

interface EBookPlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
}

export function EBookPlayerControls({ 
  isPlaying, 
  onPlayPause,
  hasAudio = false,
  onPlayAudio
}: EBookPlayerControlsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant={isPlaying ? "secondary" : "default"}
        onClick={onPlayPause}
      >
        {isPlaying ? "Pause" : "Start Reading"}
      </Button>
      
      {hasAudio && onPlayAudio && (
        <Button 
          variant="outline" 
          onClick={onPlayAudio}
          className="flex items-center gap-2"
        >
          <Volume className="h-4 w-4" />
          Play AI Response
        </Button>
      )}
    </div>
  );
}

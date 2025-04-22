
import { Button } from "@/components/ui/button";
import { StopCircle, MessageSquare, Mail } from "lucide-react";

interface EBookConversationFooterProps {
  isPlaying: boolean;
  stopPlayback: () => void;
  togglePlayPause: () => void;
  isRecording: boolean;
  toggleRecording: () => Promise<boolean>;
  emailNotes: () => void;
}

export function EBookConversationFooter({
  isPlaying,
  stopPlayback,
  togglePlayPause,
  isRecording,
  toggleRecording,
  emailNotes
}: EBookConversationFooterProps) {
  return (
    <div className="border-t p-4 flex flex-wrap gap-2 justify-between w-full">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={stopPlayback}
          disabled={!isPlaying}
        >
          <StopCircle className="h-4 w-4" />
        </Button>
        <Button 
          variant={isPlaying ? "destructive" : "default"}
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={isRecording ? "destructive" : "outline"}
          onClick={async () => {
            await toggleRecording();
          }}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          {isRecording ? "Stop Recording" : "Ask Question"}
        </Button>
        <Button 
          variant="outline"
          onClick={emailNotes}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Email Notes
        </Button>
      </div>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Pause, Play, StopCircle } from "lucide-react";

interface LearningControlsProps {
  isPlaying: boolean;
  isRecording: boolean;
  togglePlayPause: () => void;
  stopPlayback: () => void;
  toggleRecording: () => Promise<boolean> | boolean;
  emailNotes: () => void;
}

export function LearningControls({
  isPlaying,
  isRecording,
  togglePlayPause,
  stopPlayback,
  toggleRecording,
  emailNotes
}: LearningControlsProps) {
  return (
    <div className="border-t p-4 flex flex-wrap gap-2 justify-between">
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
            const stopped = await toggleRecording();
            // This would integrate with the chat in a real app
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

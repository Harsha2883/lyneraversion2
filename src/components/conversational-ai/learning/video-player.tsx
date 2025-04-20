
import { Pause, Play } from "lucide-react";

interface VideoPlayerProps {
  isPlaying: boolean;
}

export function VideoPlayer({ isPlaying }: VideoPlayerProps) {
  return (
    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
      <div className="text-center space-y-4">
        {isPlaying ? (
          <Pause className="h-16 w-16 text-primary mx-auto" />
        ) : (
          <Play className="h-16 w-16 text-primary mx-auto" />
        )}
        <p className="text-muted-foreground">
          {isPlaying ? "Playing course content..." : "Click play to start the lesson"}
        </p>
      </div>
    </div>
  );
}

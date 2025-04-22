
import React from "react";
import { Pause, Play } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function EBookPlayerControls({ isPlaying, onPlayPause }: PlayerControlsProps) {
  return (
    <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
      <div className="text-center space-y-4">
        <button onClick={onPlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <Pause className="h-16 w-16 text-primary mx-auto" />
          ) : (
            <Play className="h-16 w-16 text-primary mx-auto" />
          )}
        </button>
        <p className="text-muted-foreground">
          {isPlaying ? "Playing book content..." : "Click play to start listening"}
        </p>
      </div>
    </div>
  );
}

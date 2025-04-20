
import { useState } from "react";
import { toast } from "sonner";

export function useLearningControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Paused lesson" : "Resumed lesson");
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    toast.info("Stopped lesson");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? "Stopped recording" : "Started recording");
    return isRecording;
  };

  const emailNotes = () => {
    toast.success("Notes have been emailed to you");
  };

  return {
    isPlaying,
    isRecording,
    togglePlayPause,
    stopPlayback,
    toggleRecording,
    emailNotes,
  };
}

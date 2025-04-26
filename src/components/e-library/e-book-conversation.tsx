
import React, { useState } from "react";
import { EBook } from "./types/e-library-types";
import { EBookConversationHeader } from "./conversation/EBookConversationHeader";
import { EBookChatSection } from "./conversation/EBookChatSection";
import { EBookPlayerControls } from "./conversation/EBookPlayerControls";
import { useAIChat } from "@/hooks/use-ai-chat";

interface EBookConversationProps {
  book: EBook;
  onBack?: () => void;
}

export function EBookConversation({ book, onBack }: EBookConversationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { 
    messages, 
    inputMessage, 
    isLoading, 
    audioUrl,
    sendMessage, 
    setInputMessage,
    playAudioResponse 
  } = useAIChat(book.id, { contextType: "ebook", voiceEnabled: true });

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = async () => {
    setIsRecording(prev => !prev);
    // In a real implementation, this would start/stop voice recording
    // and process the audio to text
    return !isRecording; // Return new state
  };

  const emailNotes = () => {
    // In a real implementation, this would email the notes
    alert("Notes emailed successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-background rounded-lg shadow">
      <EBookConversationHeader book={book} />
      <div className="p-4">
        <EBookPlayerControls 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause} 
          hasAudio={!!audioUrl}
          onPlayAudio={playAudioResponse}
        />
        <EBookChatSection
          messages={messages}
          isLoading={isLoading}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          hasAudio={!!audioUrl}
          onPlayAudio={playAudioResponse}
        />
      </div>
      <div className="border-t p-4">
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onBack}
            className="text-primary"
          >
            ← Back to Books
          </Button>
          <Button
            variant="outline"
            onClick={emailNotes}
          >
            Email Notes
          </Button>
        </div>
      </div>
    </div>
  );
}

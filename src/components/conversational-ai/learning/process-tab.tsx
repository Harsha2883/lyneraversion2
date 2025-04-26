
import { VideoPlayer } from "./video-player";
import { ChatMessages } from "../chat/chat-messages";
import { ChatInput } from "../chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";

interface ProcessTabProps {
  isPlaying: boolean;
  messages: Message[];
  inputMessage: string;
  isLoading: boolean;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
}

export function ProcessTab({ 
  isPlaying, 
  messages, 
  inputMessage, 
  isLoading, 
  setInputMessage, 
  sendMessage,
  hasAudio = false,
  onPlayAudio
}: ProcessTabProps) {
  return (
    <div className="space-y-4">
      <VideoPlayer isPlaying={isPlaying} />
      
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium">AI Assistant (GPT-4o)</h3>
        {hasAudio && onPlayAudio && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPlayAudio}
            className="flex items-center gap-1"
          >
            <Volume className="h-4 w-4" />
            Play Audio
          </Button>
        )}
      </div>
      
      <ChatMessages messages={messages} isLoading={isLoading} />

      <ChatInput 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

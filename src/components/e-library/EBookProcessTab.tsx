
import { Pause, Play, Volume } from "lucide-react";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { EBook } from "./types/e-library-types";

interface EBookProcessTabProps {
  isPlaying: boolean;
  messages: Message[];
  isLoading: boolean;
  inputMessage: string;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
  setInputMessage: (value: string) => void;
  sendMessage: (msg: string) => void;
}

export function EBookProcessTab({
  isPlaying,
  messages,
  isLoading,
  inputMessage,
  hasAudio = false,
  onPlayAudio,
  setInputMessage,
  sendMessage
}: EBookProcessTabProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
        <div className="text-center space-y-4">
          {isPlaying ? (
            <Pause className="h-16 w-16 text-primary mx-auto" />
          ) : (
            <Play className="h-16 w-16 text-primary mx-auto" />
          )}
          <p className="text-muted-foreground">
            {isPlaying ? "Playing book content..." : "Click play to start listening"}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium">AI Reading Assistant (GPT-4o)</h3>
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

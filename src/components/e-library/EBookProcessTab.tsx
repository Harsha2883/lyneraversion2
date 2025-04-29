
import { Pause, Play } from "lucide-react";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { EBook } from "./types/e-library-types";

interface EBookProcessTabProps {
  isPlaying: boolean;
  messages: Message[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (value: string) => void;
  sendMessage: (msg: string) => void;
}

export function EBookProcessTab({
  isPlaying,
  messages,
  isLoading,
  inputMessage,
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

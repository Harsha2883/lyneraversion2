
import { VideoPlayer } from "./video-player";
import { ChatMessages } from "../chat/chat-messages";
import { ChatInput } from "../chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";

interface ProcessTabProps {
  isPlaying: boolean;
  messages: Message[];
  inputMessage: string;
  isLoading: boolean;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => void;
}

export function ProcessTab({ 
  isPlaying, 
  messages, 
  inputMessage, 
  isLoading, 
  setInputMessage, 
  sendMessage 
}: ProcessTabProps) {
  return (
    <div className="space-y-4">
      <VideoPlayer isPlaying={isPlaying} />
      
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

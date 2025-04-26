
import React from "react";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";

interface ChatSectionProps {
  messages: Message[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
}

export function EBookChatSection({
  messages,
  isLoading,
  inputMessage,
  setInputMessage,
  sendMessage,
  hasAudio = false,
  onPlayAudio
}: ChatSectionProps) {
  return (
    <div className="space-y-4">
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

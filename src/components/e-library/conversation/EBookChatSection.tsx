
import React from "react";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";

interface ChatSectionProps {
  messages: Message[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
}

export function EBookChatSection({
  messages,
  isLoading,
  inputMessage,
  setInputMessage,
  sendMessage,
}: ChatSectionProps) {
  return (
    <div>
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

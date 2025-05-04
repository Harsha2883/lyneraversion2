
import React from "react";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          isLoading={isLoading}
          placeholder="Ask questions about this book..."
        />
      </CardContent>
    </Card>
  );
}


import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { Message } from "@/hooks/use-ai-chat";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <ScrollArea className="h-[300px] border rounded-md p-4" ref={scrollAreaRef}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="text-center text-muted-foreground animate-pulse py-2">
          AI is thinking...
        </div>
      )}
      {messages.length === 0 && !isLoading && (
        <div className="text-center text-muted-foreground py-8">
          Start a conversation by sending a message.
        </div>
      )}
    </ScrollArea>
  );
}

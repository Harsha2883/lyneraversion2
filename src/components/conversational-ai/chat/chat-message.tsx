
import { Message } from "@/hooks/use-ai-chat";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`mb-4 p-3 rounded-lg ${
        message.role === 'assistant' ? 'bg-muted' : 'bg-primary/10'
      }`}
    >
      <p>{message.content}</p>
    </div>
  );
}

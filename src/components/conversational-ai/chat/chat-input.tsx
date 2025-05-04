
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  sendMessage, 
  isLoading,
  placeholder = "Ask a question about the course..." 
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };
  
  return (
    <div className="flex gap-2 items-center">
      <Input 
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        onClick={() => sendMessage(inputMessage)}
        disabled={!inputMessage.trim() || isLoading}
        size="icon"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

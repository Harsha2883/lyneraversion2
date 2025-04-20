
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  sendMessage, 
  isLoading 
}: ChatInputProps) {
  return (
    <div className="flex gap-2">
      <Input 
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
        placeholder="Ask a question about the course..."
        className="flex-1"
      />
      <Button 
        onClick={() => sendMessage(inputMessage)}
        disabled={!inputMessage.trim() || isLoading}
      >
        Send
      </Button>
    </div>
  );
}

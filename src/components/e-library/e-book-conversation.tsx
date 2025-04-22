
import React, { useState } from "react";
import { EBook } from "./types/e-library-types";
import { Message } from "@/hooks/use-ai-chat";
import { EBookConversationHeader } from "./conversation/EBookConversationHeader";
import { EBookChatSection } from "./conversation/EBookChatSection";
import { EBookPlayerControls } from "./conversation/EBookPlayerControls";

interface EBookConversationProps {
  book: EBook;
  initialMessages?: Message[];
  onBack?: () => void;
}

export function EBookConversation({ book, initialMessages = [], onBack }: EBookConversationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setIsLoading(true);
    
    // Create a message with the timestamp as a Date object instead of a string
    const newUserMessage: Message = { 
      id: Date.now().toString(), 
      content: msg, 
      role: "user",
      timestamp: new Date() // Changed from string to Date object
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Simulate AI reply (replace with real API)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), 
        content: "AI response...", 
        role: "assistant",
        timestamp: new Date() // Changed from string to Date object
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
    
    setInputMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-background rounded-lg shadow">
      <EBookConversationHeader book={book} />
      <div className="p-4">
        <EBookPlayerControls isPlaying={isPlaying} onPlayPause={handlePlayPause} />
        <EBookChatSection
          messages={messages}
          isLoading={isLoading}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
        />
      </div>
      {onBack && (
        <div className="p-4 border-t">
          <button 
            onClick={onBack}
            className="text-primary hover:underline"
          >
            ← Back to Books
          </button>
        </div>
      )}
    </div>
  );
}

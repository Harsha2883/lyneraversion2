
import React, { useState } from "react";
import { EBook } from "./types/e-library-types";
import { Message } from "@/hooks/use-ai-chat";
import { EBookConversationHeader } from "./conversation/EBookConversationHeader";
import { EBookChatSection } from "./conversation/EBookChatSection";
import { EBookPlayerControls } from "./conversation/EBookPlayerControls";

interface EBookConversationProps {
  book: EBook;
  initialMessages?: Message[];
}

export function EBookConversation({ book, initialMessages = [] }: EBookConversationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { id: Date.now().toString(), content: msg, role: "user" }]);
    // Simulate AI reply (replace with real API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), content: "AI response...", role: "assistant" },
      ]);
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
    </div>
  );
}

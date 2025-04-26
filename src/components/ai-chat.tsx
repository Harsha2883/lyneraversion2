
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, User, Mic, MicOff, Volume } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAIChat } from "@/hooks/use-ai-chat";

export function AIChat() {
  const { 
    messages, 
    inputMessage, 
    isLoading, 
    isListening,
    audioUrl,
    sendMessage, 
    setInputMessage,
    startListening,
    stopListening,
    playAudioResponse
  } = useAIChat(undefined, { contextType: "general", voiceEnabled: true });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Sustainability Learning Assistant (GPT-4o)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="flex-1 space-y-4 py-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      <Leaf className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.role === "assistant" && message.audio && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 mt-1"
                      onClick={playAudioResponse}
                    >
                      <Volume className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleVoiceToggle}
          className={isListening ? "bg-red-100" : ""}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about sustainability..."
          className="flex-1"
          disabled={isListening}
        />
        <Button size="icon" onClick={handleSend} disabled={!inputMessage.trim() || isLoading}>
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m3 3 3 9-3 9 19-9z"></path>
              <path d="M6 12h16"></path>
            </svg>
          )}
        </Button>
      </div>
    </Card>
  );
}

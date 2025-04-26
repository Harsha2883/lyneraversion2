
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Message {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
  audio?: string; // Optional audio response in base64 format
}

interface UseAIChatOptions {
  contextType?: "course" | "assessment" | "ebook" | "general";
  voiceEnabled?: boolean;
}

export function useAIChat(id?: string, options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const contextType = options.contextType || "general";
  const voiceEnabled = options.voiceEnabled || false;

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Clear any previous audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { 
          content: message, 
          contextType, 
          voiceEnabled,
          id // This could be courseId, bookId, etc.
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text,
        role: 'assistant',
        timestamp: new Date(),
        audio: data.audio
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // If we have audio and voice is enabled, create a playable URL
      if (voiceEnabled && data.audio) {
        const binaryAudio = atob(data.audio);
        const bytes = new Uint8Array(binaryAudio.length);
        for (let i = 0; i < binaryAudio.length; i++) {
          bytes[i] = binaryAudio.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  // For voice input functionality
  const startListening = async () => {
    try {
      setIsListening(true);
      // In production, implement voice recognition here
      // For now, this is just a placeholder
      toast.info("Voice recognition started");
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast.error('Failed to start voice recognition');
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    // In production, implement the logic to stop recording and process the audio
    // For now, just a placeholder
    toast.info("Voice recognition stopped");
  };

  // Play audio response if available
  const playAudioResponse = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return {
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
  };
}


import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Message {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

export function useAIChat(courseId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
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
      console.log(`Sending message to AI course function for course ID: ${courseId}`);
      
      const { data, error } = await supabase.functions.invoke('ai-course', {
        body: { courseId, userMessage: message }
      });

      if (error) {
        console.error('Error from AI course function:', error);
        throw error;
      }

      console.log('Received response from AI course function:', data);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputMessage,
    isLoading,
    sendMessage,
    setInputMessage,
    clearMessages,
  };
}

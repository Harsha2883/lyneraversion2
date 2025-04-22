import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { EBook } from "./types/e-library-types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { EBookProcessTab } from "./EBookProcessTab";
import { EBookLearningHistoryTab } from "./EBookLearningHistoryTab";
import { EBookConversationFooter } from "./EBookConversationFooter";
import { Message } from "@/hooks/use-ai-chat";

interface EBookConversationProps {
  book: EBook;
  onBack: () => void;
}

export function EBookConversation({ book, onBack }: EBookConversationProps) {
  const [activeTab, setActiveTab] = useState("process");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your AI assistant for "${book.title}". What would you like to discuss about this book?`,
      timestamp: new Date().toISOString(),
    }
  ]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const toggleRecording = async () => {
    const wasPreviouslyRecording = isRecording;
    setIsRecording(!isRecording);
    if (wasPreviouslyRecording && activeTab === "process") {
      await sendMessage("Tell me more about this book");
    }
    return !isRecording;
  };

  const emailNotes = () => {
    toast.success("Notes have been emailed to your registered email address");
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response about "${book.title}". In a real implementation, this would connect to an AI service to discuss the book content.`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const learningHistory = [
    {
      id: "1",
      title: `Discussion about ${book.title}`,
      date: "2025-04-20",
      duration: "15 minutes",
      notes: "Covered main themes and character development"
    },
    {
      id: "2",
      title: `Key concepts in ${book.title}`,
      date: "2025-04-18",
      duration: "10 minutes",
      notes: "Explored the central ideas and their applications"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Conversational E-Book: {book.title}</h2>
      </div>

      <Card className="border">
        <CardHeader className="px-4 py-3 border-b">
          <Tabs 
            defaultValue="process" 
            className="w-full"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="process">Process and Play</TabsTrigger>
              <TabsTrigger value="history">Learning History</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-6">
          <TabsContent value="process" className="mt-0">
            <EBookProcessTab
              isPlaying={isPlaying}
              messages={messages}
              isLoading={isLoading}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              sendMessage={sendMessage}
            />
          </TabsContent>
          <TabsContent value="history" className="mt-0">
            <EBookLearningHistoryTab 
              book={book}
              learningHistory={learningHistory}
            />
          </TabsContent>
        </CardContent>
        <CardFooter>
          <EBookConversationFooter 
            isPlaying={isPlaying}
            stopPlayback={stopPlayback}
            togglePlayPause={togglePlayPause}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            emailNotes={emailNotes}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

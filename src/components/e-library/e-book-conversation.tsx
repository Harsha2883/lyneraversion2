
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, StopCircle, Play, Pause, MessageSquare, Mail } from "lucide-react";
import { EBook } from "./types/e-library-types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChatMessages } from "@/components/conversational-ai/chat/chat-messages";
import { ChatInput } from "@/components/conversational-ai/chat/chat-input";
import { Message } from "@/hooks/use-ai-chat";
import { toast } from "sonner";

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
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response
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
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <div className="text-center space-y-4">
                  {isPlaying ? (
                    <Pause className="h-16 w-16 text-primary mx-auto" />
                  ) : (
                    <Play className="h-16 w-16 text-primary mx-auto" />
                  )}
                  <p className="text-muted-foreground">
                    {isPlaying ? "Playing book content..." : "Click play to start listening"}
                  </p>
                </div>
              </div>
              
              <ChatMessages messages={messages} isLoading={isLoading} />

              <ChatInput 
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Learning History with This Book</h3>
              
              {learningHistory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Duration: {item.duration}</div>
                  <p className="text-sm mt-2">{item.notes}</p>
                  <Button variant="outline" size="sm" className="mt-2">Review</Button>
                </div>
              ))}
              
              {learningHistory.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No learning history yet.</p>
              )}
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter>
          <div className="border-t p-4 flex flex-wrap gap-2 justify-between w-full">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={stopPlayback}
                disabled={!isPlaying}
              >
                <StopCircle className="h-4 w-4" />
              </Button>
              
              <Button 
                variant={isPlaying ? "destructive" : "default"}
                onClick={togglePlayPause}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={isRecording ? "destructive" : "outline"}
                onClick={async () => {
                  await toggleRecording();
                }}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {isRecording ? "Stop Recording" : "Ask Question"}
              </Button>
              
              <Button 
                variant="outline"
                onClick={emailNotes}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Notes
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

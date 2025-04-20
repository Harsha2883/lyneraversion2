import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, MessageSquare, Pause, Play, StopCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProcessPlayDashboardProps {
  courseId: string;
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

export function ProcessPlayDashboard({ courseId, onBack }: ProcessPlayDashboardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState("process");
  const [isLoading, setIsLoading] = useState(false);

  // Sample learning history entries
  const learningHistory = [
    { id: "1", title: "Introduction to Sustainability", date: "2 days ago", duration: "15 mins" },
    { id: "2", title: "Renewable Energy Sources", date: "1 day ago", duration: "22 mins" },
    { id: "3", title: "Carbon Footprint Reduction", date: "Today", duration: "18 mins" },
  ];

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
      const { data, error } = await supabase.functions.invoke('ai-course', {
        body: { courseId, userMessage: message }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Paused lesson" : "Resumed lesson");
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    toast.info("Stopped lesson");
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Stopped recording");
    } else {
      setIsRecording(true);
      toast.success("Started recording");
      // For demo purposes, simulate a question after recording
      await sendMessage("Tell me more about this topic");
    }
  };

  const emailNotes = () => {
    toast.success("Notes have been emailed to you");
  };

  const reviseCourse = (historyId: string) => {
    toast.info(`Reviewing lesson from history item ${historyId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Course Dashboard</h2>
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
                    {isPlaying ? "Playing course content..." : "Click play to start the lesson"}
                  </p>
                </div>
              </div>
              
              <ScrollArea className="h-[200px] border rounded-md p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 p-3 rounded-lg ${
                      msg.role === 'assistant' ? 'bg-muted' : 'bg-primary/10'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center text-muted-foreground">
                    AI is thinking...
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {learningHistory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.date} • {item.duration}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => reviseCourse(item.id)}>
                      Revise
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="border-t p-4 flex flex-wrap gap-2 justify-between">
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
              onClick={toggleRecording}
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
        </CardFooter>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Learning History</h3>
        <div className="space-y-3">
          {learningHistory.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.date} • {item.duration}
                </p>
              </div>
              <Button size="sm" onClick={() => reviseCourse(item.id)}>
                Revise
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

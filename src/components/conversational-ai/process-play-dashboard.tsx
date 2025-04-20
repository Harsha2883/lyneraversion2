
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ProcessTab } from "./learning/process-tab";
import { LearningHistoryTab } from "./learning/learning-history-tab";
import { LearningControls } from "./learning/learning-controls";
import { useAIChat } from "@/hooks/use-ai-chat";
import { useLearningControl } from "@/hooks/use-learning-control";
import { getLearningHistory } from "@/utils/learning-history";
import { LearningHistoryItem } from "./learning/history-item";

interface ProcessPlayDashboardProps {
  courseId: string;
  onBack: () => void;
}

export function ProcessPlayDashboard({ courseId, onBack }: ProcessPlayDashboardProps) {
  const [activeTab, setActiveTab] = useState("process");
  const { 
    messages, 
    inputMessage, 
    isLoading, 
    sendMessage, 
    setInputMessage 
  } = useAIChat(courseId);
  
  const {
    isPlaying,
    isRecording,
    togglePlayPause,
    stopPlayback,
    toggleRecording,
    emailNotes
  } = useLearningControl();

  // Get learning history
  const learningHistory = getLearningHistory();

  const reviseCourse = (historyId: string) => {
    toast.info(`Reviewing lesson from history item ${historyId}`);
  };

  const handleRecordingWithChat = async () => {
    const stopped = toggleRecording();
    if (stopped && activeTab === "process") {
      // For demo purposes, simulate a question after recording
      await sendMessage("Tell me more about this topic");
    }
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
            <ProcessTab 
              isPlaying={isPlaying}
              messages={messages}
              inputMessage={inputMessage}
              isLoading={isLoading}
              setInputMessage={setInputMessage}
              sendMessage={sendMessage}
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <LearningHistoryTab 
              learningHistory={learningHistory}
              onRevise={reviseCourse}
            />
          </TabsContent>
        </CardContent>
        
        <CardFooter>
          <LearningControls 
            isPlaying={isPlaying}
            isRecording={isRecording}
            togglePlayPause={togglePlayPause}
            stopPlayback={stopPlayback}
            toggleRecording={handleRecordingWithChat}
            emailNotes={emailNotes}
          />
        </CardFooter>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Learning History</h3>
        <div className="space-y-3">
          {learningHistory.map((item: LearningHistoryItem) => (
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

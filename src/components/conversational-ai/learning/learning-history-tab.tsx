
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryItem, LearningHistoryItem } from "./history-item";

interface LearningHistoryTabProps {
  learningHistory: LearningHistoryItem[];
  onRevise: (id: string) => void;
}

export function LearningHistoryTab({ learningHistory, onRevise }: LearningHistoryTabProps) {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {learningHistory.map((item) => (
          <HistoryItem 
            key={item.id} 
            item={item} 
            onRevise={onRevise} 
          />
        ))}
      </div>
    </ScrollArea>
  );
}

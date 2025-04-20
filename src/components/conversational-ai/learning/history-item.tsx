
import { Button } from "@/components/ui/button";

export interface LearningHistoryItem {
  id: string;
  title: string;
  date: string;
  duration: string;
}

interface HistoryItemProps {
  item: LearningHistoryItem;
  onRevise: (id: string) => void;
}

export function HistoryItem({ item, onRevise }: HistoryItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md">
      <div>
        <h4 className="font-medium">{item.title}</h4>
        <p className="text-sm text-muted-foreground">
          {item.date} • {item.duration}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => onRevise(item.id)}>
        Revise
      </Button>
    </div>
  );
}

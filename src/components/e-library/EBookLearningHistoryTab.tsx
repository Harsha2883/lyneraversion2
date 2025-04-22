
import { Button } from "@/components/ui/button";
import { EBook } from "./types/e-library-types";

interface LearningHistoryItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  notes: string;
}

interface EBookLearningHistoryTabProps {
  book: EBook;
  learningHistory: LearningHistoryItem[];
}

export function EBookLearningHistoryTab({ book, learningHistory }: EBookLearningHistoryTabProps) {
  return (
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
  );
}

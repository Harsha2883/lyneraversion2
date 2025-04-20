
import { LearningHistoryItem } from "@/components/conversational-ai/learning/history-item";

// Sample learning history entries
export const getLearningHistory = (): LearningHistoryItem[] => {
  return [
    { id: "1", title: "Introduction to Sustainability", date: "2 days ago", duration: "15 mins" },
    { id: "2", title: "Renewable Energy Sources", date: "1 day ago", duration: "22 mins" },
    { id: "3", title: "Carbon Footprint Reduction", date: "Today", duration: "18 mins" },
  ];
};

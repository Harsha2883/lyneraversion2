
import React, { useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pen, Mic } from "lucide-react";

interface QuestionInputProps {
  question: string;
  onChange: (question: string) => void;
  type: "objective" | "subjective";
}

export default function QuestionInput({ question, onChange, type }: QuestionInputProps) {
  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <Pen className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">
          {type === "objective" ? "Objective Question" : "Subjective Question"}
        </span>
      </div>
      <Textarea
        placeholder="Type your question here or use the mic..."
        className="my-2"
        value={question || ""}
        onChange={handleChange}
      />
      <Button 
        variant="ghost" 
        size="icon" 
        type="button" 
        disabled 
        title="Voice input coming soon"
        aria-label="Record voice input (coming soon)"
      >
        <Mic className="h-4 w-4" />
      </Button>
    </div>
  );
}

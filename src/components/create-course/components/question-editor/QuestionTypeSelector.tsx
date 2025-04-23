
import React from "react";
import { Button } from "@/components/ui/button";

interface QuestionTypeSelectorProps {
  currentType: "objective" | "subjective";
  onTypeChange: (type: "objective" | "subjective") => void;
}

export default function QuestionTypeSelector({ currentType, onTypeChange }: QuestionTypeSelectorProps) {
  return (
    <div className="flex gap-3 items-center mb-2">
      <span className="text-sm mr-2 font-semibold">Type:</span>
      <Button
        size="sm"
        variant={currentType === "objective" ? "default" : "outline"}
        onClick={() => onTypeChange("objective")}
      >
        Objective
      </Button>
      <Button
        size="sm"
        className="ml-1"
        variant={currentType === "subjective" ? "default" : "outline"}
        onClick={() => onTypeChange("subjective")}
      >
        Subjective
      </Button>
    </div>
  );
}

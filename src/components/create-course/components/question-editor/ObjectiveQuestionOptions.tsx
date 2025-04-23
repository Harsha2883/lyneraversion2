
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Option } from "../../types/assessment-types";

interface ObjectiveQuestionOptionsProps {
  options: Option[];
  allowMultiple: boolean;
  onOptionTextChange: (idx: number, value: string) => void;
  onOptionCorrectChange: (idx: number, checked: boolean) => void;
  onAddOption: () => void;
  onRemoveOption: (idx: number) => void;
  optionsLimit: number;
}

export default function ObjectiveQuestionOptions({
  options,
  allowMultiple,
  onOptionTextChange,
  onOptionCorrectChange,
  onAddOption,
  onRemoveOption,
  optionsLimit
}: ObjectiveQuestionOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-1">
          <Input
            className="w-2/3"
            value={opt.text}
            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
            onChange={e => onOptionTextChange(idx, e.target.value)}
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="mr-1"
              checked={!!opt.isCorrect}
              onChange={e => onOptionCorrectChange(idx, e.target.checked)}
              disabled={!allowMultiple && opt.isCorrect}
            />
            <span className="text-sm">{allowMultiple ? "Correct" : "Answer"}</span>
          </label>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => onRemoveOption(idx)}
            disabled={options.length <= 1}
            aria-label="Remove option"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      {options.length < optionsLimit && (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="mt-2 flex items-center gap-1"
          onClick={onAddOption}
        >
          <Plus className="h-4 w-4" /> Add Option
        </Button>
      )}
    </div>
  );
}

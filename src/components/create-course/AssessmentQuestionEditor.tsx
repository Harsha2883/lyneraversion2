
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Trash2, Pen, Mic, Plus } from "lucide-react";

type QuestionType = "objective" | "subjective";

interface Option {
  text: string;
  isCorrect: boolean;
}

export interface AssessmentQuestion {
  id: number;
  type: QuestionType;
  question: string;
  questionAudio?: string; // Placeholder for audio data URL for now
  options?: Option[];
  allowMultiple?: boolean;
  answer?: string; // For subjective (model answer)
  answerDocumentUrl?: string;
}

interface Props {
  question: AssessmentQuestion;
  onChange: (q: AssessmentQuestion) => void;
  onRemove: () => void;
  objectiveOptionsLimit?: number;
}

const MAX_OPTIONS = 5;

const AssessmentQuestionEditor: React.FC<Props> = ({
  question,
  onChange,
  onRemove,
  objectiveOptionsLimit = 5
}) => {
  const [showAddOption, setShowAddOption] = useState(false);

  // Handles
  const handleOptionTextChange = (idx: number, value: string) => {
    if (question.options) {
      const options = [...question.options];
      options[idx].text = value;
      onChange({ ...question, options });
    }
  };

  const handleOptionCorrectChange = (idx: number, checked: boolean) => {
    if (question.options) {
      let options = [...question.options];
      if (!question.allowMultiple) {
        // Only allow one correct
        options = options.map((opt, i) => ({ ...opt, isCorrect: i === idx ? checked : false }));
      } else {
        options[idx].isCorrect = checked;
      }
      onChange({ ...question, options });
    }
  };

  const handleAddOption = () => {
    const options = [...(question.options || [])];
    if (options.length < MAX_OPTIONS) {
      options.push({ text: "", isCorrect: false });
      onChange({ ...question, options });
    }
  };

  const handleRemoveOption = (idx: number) => {
    if (question.options) {
      const options = question.options.filter((_, i) => i !== idx);
      onChange({ ...question, options });
    }
  };

  return (
    <div className="relative border rounded-lg p-4 mb-4 bg-background shadow-sm space-y-3">
      <button
        type="button"
        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
        aria-label="Remove question"
        onClick={onRemove}
      >
        <Trash2 />
      </button>
      {/* Question type selector */}
      <div className="flex gap-3 items-center mb-2">
        <span className="text-sm mr-2 font-semibold">Type:</span>
        <Button
          size="sm"
          variant={question.type === "objective" ? "default" : "outline"}
          onClick={() =>
            onChange({
              ...question,
              type: "objective",
              options: question.options && question.options.length ? question.options : [
                { text: "", isCorrect: false }
              ],
              allowMultiple: false,
              answer: undefined,
              answerDocumentUrl: undefined,
            })
          }
        >
          Objective
        </Button>
        <Button
          size="sm"
          className="ml-1"
          variant={question.type === "subjective" ? "default" : "outline"}
          onClick={() =>
            onChange({
              ...question,
              type: "subjective",
              options: undefined,
              allowMultiple: false,
              answer: "",
              answerDocumentUrl: undefined,
            })
          }
        >
          Subjective
        </Button>
      </div>
      {/* Question input */}
      <div>
        <div className="flex items-center gap-2">
          <Pen className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">
            {question.type === "objective" ? "Objective Question" : "Subjective Question"}
          </span>
        </div>
        <Textarea
          placeholder={
            question.type === "subjective"
              ? "Type your question here or use the mic..."
              : "Type your question here or use the mic..."
          }
          className="my-2"
          value={question.question}
          onChange={e => onChange({ ...question, question: e.target.value })}
        />
        {/* Microphone (stub, not implemented yet) */}
        <Button variant="ghost" size="icon" type="button" disabled title="Voice input coming soon">
          <Mic className="h-4 w-4" />
        </Button>
      </div>
      {/* Objective Options */}
      {question.type === "objective" && (
        <>
          <div className="flex gap-2 items-center mb-2">
            <span className="text-sm font-semibold">Allow Multiple Answers:</span>
            <Switch
              checked={!!question.allowMultiple}
              onCheckedChange={checked =>
                onChange({
                  ...question,
                  allowMultiple: checked,
                  // Reset options' isCorrect if toggled off
                  options: checked
                    ? question.options
                    : question.options?.map(opt => ({ ...opt, isCorrect: false })),
                })
              }
            />
          </div>
          {question.options?.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <Input
                className="w-2/3"
                value={opt.text}
                placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                onChange={e => handleOptionTextChange(idx, e.target.value)}
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={!!opt.isCorrect}
                  onChange={e => handleOptionCorrectChange(idx, e.target.checked)}
                  disabled={!question.allowMultiple && opt.isCorrect}
                />
                <span className="text-sm">{question.allowMultiple ? "Correct" : "Answer"}</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleRemoveOption(idx)}
                disabled={question.options.length <= 1}
                aria-label="Remove option"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {question.options && question.options.length < (objectiveOptionsLimit || 5) && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="mt-2 flex items-center gap-1"
              onClick={handleAddOption}
            >
              <Plus className="h-4 w-4" /> Add Option
            </Button>
          )}
        </>
      )}
      {/* Subjective Model Answer & Upload (optional) */}
      {question.type === "subjective" && (
        <>
          <div className="mt-2 flex flex-col gap-2">
            <Textarea
              placeholder="Optional: Type model answer or requirements here..."
              className="my-2"
              value={question.answer || ""}
              onChange={e => onChange({ ...question, answer: e.target.value })}
            />
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                Optional: Upload supporting document (PDF/DOCX/TXT/ZIP)
              </label>
              <Input type="file" accept=".pdf,.docx,.doc,.txt,.zip" 
                onChange={e => {
                  // For demo purpose, we're not uploading the document but can be hooked to Supabase/storage in future
                  if (e.target.files && e.target.files[0]) {
                    onChange({ ...question, answerDocumentUrl: e.target.files[0].name });
                  }
                }}
              />
              {question.answerDocumentUrl && (
                <div className="text-xs mt-1 text-muted-foreground">File: {question.answerDocumentUrl}</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentQuestionEditor;

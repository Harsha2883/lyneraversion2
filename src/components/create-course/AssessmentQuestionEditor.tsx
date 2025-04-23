
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Pen, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentQuestion } from "./types/assessment-types";
import QuestionTypeSelector from "./components/question-editor/QuestionTypeSelector";
import ObjectiveQuestionOptions from "./components/question-editor/ObjectiveQuestionOptions";
import SubjectiveQuestionEditor from "./components/question-editor/SubjectiveQuestionEditor";

interface Props {
  question: AssessmentQuestion;
  onChange: (q: AssessmentQuestion) => void;
  onRemove: () => void;
  objectiveOptionsLimit?: number;
}

const AssessmentQuestionEditor: React.FC<Props> = ({
  question,
  onChange,
  onRemove,
  objectiveOptionsLimit = 5
}) => {
  const MAX_OPTIONS = objectiveOptionsLimit;

  // Handle question type change
  const handleTypeChange = (type: "objective" | "subjective") => {
    if (type === "objective") {
      onChange({
        ...question,
        type: "objective",
        options: question.options && question.options.length ? question.options : [
          { text: "", isCorrect: false }
        ],
        allowMultiple: false,
        answer: undefined,
        answerDocumentUrl: undefined,
      });
    } else {
      onChange({
        ...question,
        type: "subjective",
        options: undefined,
        allowMultiple: false,
        answer: "",
        answerDocumentUrl: undefined,
      });
    }
  };

  // Option handling functions
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
      <QuestionTypeSelector 
        currentType={question.type} 
        onTypeChange={handleTypeChange} 
      />
      
      {/* Question input */}
      <div>
        <div className="flex items-center gap-2">
          <Pen className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">
            {question.type === "objective" ? "Objective Question" : "Subjective Question"}
          </span>
        </div>
        <Textarea
          placeholder="Type your question here or use the mic..."
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
          
          {question.options && (
            <ObjectiveQuestionOptions
              options={question.options}
              allowMultiple={!!question.allowMultiple}
              onOptionTextChange={handleOptionTextChange}
              onOptionCorrectChange={handleOptionCorrectChange}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              optionsLimit={MAX_OPTIONS}
            />
          )}
        </>
      )}
      
      {/* Subjective Model Answer & Upload */}
      {question.type === "subjective" && (
        <SubjectiveQuestionEditor
          answer={question.answer}
          answerDocumentUrl={question.answerDocumentUrl}
          onAnswerChange={(value) => onChange({ ...question, answer: value })}
          onDocumentChange={(fileName) => onChange({ ...question, answerDocumentUrl: fileName })}
        />
      )}
    </div>
  );
};

export default AssessmentQuestionEditor;

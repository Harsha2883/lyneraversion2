
import React, { useState } from "react";
import AssessmentQuestionEditor, { AssessmentQuestion } from "./AssessmentQuestionEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MAX_QUESTIONS = 10;

export default function AssessmentTab() {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);

  // Add question
  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions([
      ...questions,
      {
        id: Date.now() + Math.random(),
        type: "objective",
        question: "",
        questionAudio: "",
        options: [{ text: "", isCorrect: false }],
        allowMultiple: false,
      }
    ]);
  };

  // Remove question
  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  // Update question
  const updateQuestion = (idx: number, updated: AssessmentQuestion) => {
    setQuestions(questions.map((q, i) => (i === idx ? updated : q)));
  };

  // Drag/Drop ordering
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    setDragIndex(idx);
  };
  const handleDragOver = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    const updated = [...questions];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(idx, 0, dragged);
    setQuestions(updated);
    setDragIndex(idx);
  };
  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="py-2">
      <div className="mb-4 text-center flex flex-col items-center">
        <Button
          variant="default"
          size="lg"
          className="mb-2 flex items-center gap-2 text-base px-8 py-3"
          onClick={addQuestion}
          disabled={questions.length >= MAX_QUESTIONS}
        >
          <Plus className="mr-1" />
          Add Question
        </Button>
        <span className="text-xs text-muted-foreground">
          {questions.length}/{MAX_QUESTIONS} questions added.&nbsp;
          <span>We recommend creating 10 questions.</span>
        </span>
      </div>
      {questions.length === 0 ? (
        <div className="p-8 rounded bg-muted flex justify-center text-muted-foreground">
          No questions yet. Use the "Add Question" button above.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`flex items-start group border rounded-md bg-background shadow-md mb-2 transition
                ${dragIndex === idx ? "opacity-70 ring-2 ring-primary/60" : ""}
              `}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={e => { e.preventDefault(); handleDragOver(idx); }}
              onDragEnd={handleDragEnd}
            >
              {/* Numbering and Drag Handle */}
              <div className="flex flex-col items-center px-2 py-6 cursor-grab select-none bg-accent/60 rounded-l-md shrink-0 w-14">
                <span className="font-bold text-xl text-primary drop-shadow">{idx + 1}</span>
                <span className="text-xs text-muted-foreground mt-2">(drag)</span>
              </div>
              <div className="flex-1">
                <AssessmentQuestionEditor
                  question={q}
                  onChange={upd => updateQuestion(idx, upd)}
                  onRemove={() => removeQuestion(idx)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

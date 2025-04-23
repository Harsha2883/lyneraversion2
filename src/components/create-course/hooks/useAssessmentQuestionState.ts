
import { useState } from "react";
import { AssessmentQuestion } from "../types/assessment-types";

export interface UseAssessmentQuestionStateProps {
  objectiveOptionsLimit?: number;
}

export function useAssessmentQuestionState({ objectiveOptionsLimit = 5 }: UseAssessmentQuestionStateProps = {}) {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const MAX_QUESTIONS = 10;

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

  // Handle drag events
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

  return {
    questions,
    dragIndex,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    MAX_QUESTIONS,
  };
}

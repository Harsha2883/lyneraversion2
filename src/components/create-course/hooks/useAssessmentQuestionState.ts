
import { useState, useCallback } from "react";
import { AssessmentQuestion } from "../types/assessment-types";
import { MAX_QUESTIONS } from "../constants/assessment-constants";

export interface UseAssessmentQuestionStateProps {
  objectiveOptionsLimit?: number;
}

export function useAssessmentQuestionState({ objectiveOptionsLimit = 5 }: UseAssessmentQuestionStateProps = {}) {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Add question
  const addQuestion = useCallback(() => {
    if (questions.length >= MAX_QUESTIONS) return;
    
    setQuestions(prevQuestions => [
      ...prevQuestions,
      {
        id: Date.now() + Math.random(),
        type: "objective",
        question: "",
        questionAudio: "",
        options: [{ text: "", isCorrect: false }],
        allowMultiple: false,
      }
    ]);
  }, [questions.length]);

  // Remove question
  const removeQuestion = useCallback((idx: number) => {
    setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== idx));
  }, []);

  // Update question
  const updateQuestion = useCallback((idx: number, updated: AssessmentQuestion) => {
    setQuestions(prevQuestions => prevQuestions.map((q, i) => (i === idx ? updated : q)));
  }, []);

  // Handle drag events
  const handleDragStart = useCallback((idx: number) => {
    setDragIndex(idx);
  }, []);

  const handleDragOver = useCallback((idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    
    setQuestions(prevQuestions => {
      const updated = [...prevQuestions];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(idx, 0, dragged);
      return updated;
    });
    
    setDragIndex(idx);
  }, [dragIndex]);

  const handleDragEnd = useCallback(() => setDragIndex(null), []);

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


import { useState } from "react";
import { toast } from "sonner";
import { Assessment, AssessmentMode } from "../types/assessment-types";

export function useAssessmentState() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(false);

  const handleSelectAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setAssessmentMode(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleSelectMode = (mode: AssessmentMode) => {
    setAssessmentMode(mode);
  };

  const handleBack = () => {
    if (assessmentMode) {
      setAssessmentMode(null);
    } else if (selectedAssessment) {
      setSelectedAssessment(null);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate transcription
      setTimeout(() => {
        if (selectedAssessment) {
          const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
          const simulatedAnswer = currentQuestion.type === "subjective" 
            ? "This is a simulated voice response that would be transcribed from the user's speech."
            : 0;
          
          handleAnswerChange(currentQuestion.id, simulatedAnswer);
          setIsRecording(false);
          setEditingAnswer(true);
          toast.success("Answer recorded");
        }
      }, 2000);
    } else {
      toast.info("Started recording...");
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && selectedAssessment) {
      toast.info(`Playing question: ${selectedAssessment.questions[currentQuestionIndex].text}`);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAssessment) {
      const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
      if (answers[currentQuestion.id] !== undefined) {
        toast.success("Answer submitted");
        
        if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setEditingAnswer(false);
        } else {
          toast.success("Assessment completed!");
          setSelectedAssessment(null);
          setAssessmentMode(null);
        }
      } else {
        toast.error("Please provide an answer");
      }
    }
  };

  return {
    selectedAssessment,
    assessmentMode,
    currentQuestionIndex,
    answers,
    isRecording,
    isPlaying,
    editingAnswer,
    handleSelectAssessment,
    handleSelectMode,
    handleBack,
    handleAnswerChange,
    toggleRecording,
    togglePlayback,
    handleSubmitAnswer
  };
}

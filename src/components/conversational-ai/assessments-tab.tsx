import { useState } from "react";
import { Assessment } from "./types/assessment-types";
import { mockAssessments } from "./data/mock-assessments";
import { AssessmentList } from "./components/assessment-list";
import { AssessmentModeSelector } from "./components/assessment-mode-selector";
import { WrittenAssessment } from "./components/written-assessment";
import { VoiceAssessment } from "./components/voice-assessment";
import { useAssessmentState } from "./hooks/use-assessment-state";

export function AssessmentsTab() {
  const {
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
  } = useAssessmentState();

  if (!selectedAssessment) {
    return <AssessmentList assessments={mockAssessments} onSelectAssessment={handleSelectAssessment} />;
  }

  if (!assessmentMode) {
    return (
      <AssessmentModeSelector
        onModeSelect={handleSelectMode}
        onBack={handleBack}
        title={selectedAssessment.title}
      />
    );
  }

  const currentQuestion = selectedAssessment.questions[currentQuestionIndex];

  return assessmentMode === "write" ? (
    <WrittenAssessment
      question={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={selectedAssessment.questions.length}
      answer={answers[currentQuestion.id]}
      onAnswerChange={handleAnswerChange}
      onBack={handleBack}
      onSubmit={handleSubmitAnswer}
      title={selectedAssessment.title}
    />
  ) : (
    <VoiceAssessment
      question={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={selectedAssessment.questions.length}
      answer={answers[currentQuestion.id]}
      isPlaying={isPlaying}
      isRecording={isRecording}
      editingAnswer={editingAnswer}
      onAnswerChange={handleAnswerChange}
      onBack={handleBack}
      onTogglePlayback={togglePlayback}
      onToggleRecording={toggleRecording}
      onSubmit={handleSubmitAnswer}
      title={selectedAssessment.title}
    />
  );
}

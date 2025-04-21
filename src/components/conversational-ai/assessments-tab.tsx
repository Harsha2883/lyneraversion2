import { useState } from "react";
import { Assessment } from "./types/assessment-types";
import { AssessmentList } from "./components/assessment-list";
import { AssessmentModeSelector } from "./components/assessment-mode-selector";
import { WrittenAssessment } from "./components/written-assessment";
import { VoiceAssessment } from "./components/voice-assessment";
import { useAssessmentState } from "./hooks/use-assessment-state";

// Mock data
const assessments: Assessment[] = [
  {
    id: 1,
    title: "Sustainability Fundamentals",
    description: "Test your knowledge on sustainability basics",
    status: "completed",
    attemptsUsed: 1,
    maxAttempts: 3,
    passScore: 70,
    questions: [
      {
        id: 101,
        text: "What are the three pillars of sustainability?",
        type: "subjective"
      },
      {
        id: 102,
        text: "Which of the following is a renewable energy source?",
        type: "objective",
        options: ["Coal", "Natural Gas", "Solar", "Oil"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    title: "Carbon Reduction Strategies",
    description: "Assessment on carbon reduction methods",
    status: "incomplete",
    attemptsUsed: 0,
    maxAttempts: 3,
    passScore: 60,
    questions: [
      {
        id: 201,
        text: "Explain carbon offsetting in your own words.",
        type: "subjective"
      },
      {
        id: 202,
        text: "Which sector is responsible for the largest percentage of global carbon emissions?",
        type: "objective",
        options: ["Transportation", "Energy production", "Agriculture", "Manufacturing"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: "ESG Reporting",
    description: "Environmental, Social and Governance reporting standards",
    status: "in-progress",
    attemptsUsed: 2,
    maxAttempts: 3,
    passScore: 80,
    questions: [
      {
        id: 301,
        text: "Describe the importance of ESG reporting for businesses.",
        type: "subjective"
      },
      {
        id: 302,
        text: "Which framework is commonly used for sustainability reporting?",
        type: "objective",
        options: ["IFRS", "GRI", "FASB", "GAAP"],
        correctAnswer: 1
      }
    ]
  }
];

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
    return <AssessmentList assessments={assessments} onSelectAssessment={handleSelectAssessment} />;
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

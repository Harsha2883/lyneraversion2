import { useState } from "react";
import { toast } from "sonner";
import { Assessment, AssessmentMode } from "./types/assessment-types";
import { AssessmentCard } from "./components/assessment-card";
import { AssessmentModeSelector } from "./components/assessment-mode-selector";
import { WrittenAssessment } from "./components/written-assessment";
import { VoiceAssessment } from "./components/voice-assessment";

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
        const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];
        if (currentQuestion) {
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
    if (!isPlaying) {
      toast.info(`Playing question: ${selectedAssessment?.questions[currentQuestionIndex].text}`);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];
    if (currentQuestion && answers[currentQuestion.id] !== undefined) {
      toast.success("Answer submitted");
      
      if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
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
  };

  if (!selectedAssessment) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Available Assessments</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onSelect={handleSelectAssessment}
            />
          ))}
        </div>
      </div>
    );
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

  if (assessmentMode === "write") {
    return (
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
    );
  }

  return (
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

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Award, Mic, Play, Repeat, Save, Edit, CircleStop } from "lucide-react";
import { toast } from "sonner";

// Assessment types
type AssessmentStatus = "completed" | "incomplete" | "in-progress";
type AssessmentType = "objective" | "subjective";
type AssessmentMode = "write" | "voice";

interface Question {
  id: number;
  text: string;
  type: AssessmentType;
  options?: string[];
  correctAnswer?: string | number;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  status: AssessmentStatus;
  attemptsUsed: number;
  maxAttempts: number;
  questions: Question[];
  passScore: number;
}

export function AssessmentsTab() {
  // States
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(false);

  // Mocked data for demonstration
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

  // Handle selecting an assessment
  const handleSelectAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setAssessmentMode(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // Handle selecting a mode (write or voice)
  const handleSelectMode = (mode: AssessmentMode) => {
    setAssessmentMode(mode);
  };

  // Handle going back to previous screens
  const handleBack = () => {
    if (assessmentMode) {
      setAssessmentMode(null);
    } else if (selectedAssessment) {
      setSelectedAssessment(null);
    }
  };

  // Handle answer changes
  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  // Handle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate transcription
      setTimeout(() => {
        const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];
        if (currentQuestion) {
          const simulatedAnswer = currentQuestion.type === "subjective" 
            ? "This is a simulated voice response that would be transcribed from the user's speech."
            : 0; // For objective, we'd capture their spoken choice
          
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

  // Handle playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info(`Playing question: ${selectedAssessment?.questions[currentQuestionIndex].text}`);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  // Handle submission of answers
  const handleSubmitAnswer = () => {
    const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];
    if (currentQuestion && answers[currentQuestion.id] !== undefined) {
      toast.success("Answer submitted");
      
      // If there are more questions, go to next question
      if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setEditingAnswer(false);
      } else {
        // Assessment completed
        toast.success("Assessment completed!");
        setSelectedAssessment(null);
        setAssessmentMode(null);
      }
    } else {
      toast.error("Please provide an answer");
    }
  };

  // Render assessment selection view
  if (!selectedAssessment) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Available Assessments</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="min-w-[300px] max-w-[350px] flex-shrink-0">
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </div>
                <Badge 
                  variant={
                    assessment.status === "completed" ? "default" : 
                    assessment.status === "in-progress" ? "secondary" : "outline"
                  }
                >
                  {assessment.status === "completed" ? "Completed" : 
                   assessment.status === "in-progress" ? "In Progress" : 
                   "Not Started"}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{assessment.description}</p>
                <p className="text-sm">
                  Attempts: {assessment.attemptsUsed}/{assessment.maxAttempts}
                </p>
                <p className="text-sm">
                  Passing Score: {assessment.passScore}%
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectAssessment(assessment)}
                  disabled={assessment.attemptsUsed >= assessment.maxAttempts && assessment.status !== "completed"}
                  className="w-full"
                >
                  {assessment.status === "completed" ? "Review" : "Start Assessment"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Render mode selection view
  if (selectedAssessment && !assessmentMode) {
    return (
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <Button variant="outline" onClick={handleBack} className="mr-2">Back</Button>
          <h3 className="text-lg font-medium">{selectedAssessment.title}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:border-primary transition-colors" 
                onClick={() => handleSelectMode("write")}>
            <CardHeader>
              <CardTitle className="text-center">Written Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Type your answers to questions</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSelectMode("voice")}>
            <CardHeader>
              <CardTitle className="text-center">Voice-Enabled Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Mic className="h-10 w-10 mx-auto mb-2 text-primary" />
              <p>Speak your answers to questions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Get current question
  const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];

  // Render write mode view
  if (assessmentMode === "write" && currentQuestion) {
    return (
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <Button variant="outline" onClick={handleBack} className="mr-2">Back</Button>
          <h3 className="text-lg font-medium">
            {selectedAssessment.title} - Question {currentQuestionIndex + 1}/{selectedAssessment.questions.length}
          </h3>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "subjective" ? (
              <Textarea 
                placeholder="Type your answer here..."
                className="min-h-[150px]"
                value={answers[currentQuestion.id] as string || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              />
            ) : (
              <RadioGroup 
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Previous
            </Button>
            <Button onClick={handleSubmitAnswer}>
              {currentQuestionIndex < (selectedAssessment?.questions.length || 0) - 1
                ? "Next Question"
                : "Submit Assessment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render voice mode view
  if (assessmentMode === "voice" && currentQuestion) {
    return (
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <Button variant="outline" onClick={handleBack} className="mr-2">Back</Button>
          <h3 className="text-lg font-medium">
            {selectedAssessment.title} - Question {currentQuestionIndex + 1}/{selectedAssessment.questions.length}
          </h3>
        </div>
        
        <Card className="mb-4">
          <CardHeader className="text-center">
            <CardTitle>Play and Repeat</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            {isPlaying ? (
              <div className="animate-pulse">
                <p className="text-lg font-medium">{currentQuestion.text}</p>
                {currentQuestion.type === "objective" && (
                  <div className="mt-4 text-left max-w-md mx-auto">
                    <p className="font-medium mb-2">Options:</p>
                    <ul className="list-disc list-inside">
                      {currentQuestion.options?.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Click Play to hear the question</p>
            )}
            
            {editingAnswer && currentQuestion.type === "subjective" && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Your recorded answer:</p>
                <Textarea
                  value={answers[currentQuestion.id] as string || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
            
            {editingAnswer && currentQuestion.type === "objective" && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Your selection:</p>
                <RadioGroup 
                  value={answers[currentQuestion.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
                  className="space-y-3 max-w-md mx-auto"
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`voice-option-${index}`} />
                      <label htmlFor={`voice-option-${index}`} className="text-sm font-medium leading-none">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button 
              variant={isPlaying ? "destructive" : "outline"} 
              onClick={togglePlayback}
              className="flex items-center gap-2"
            >
              {isPlaying ? <CircleStop className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Stop" : "Play"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={togglePlayback}
              className="flex items-center gap-2"
              disabled={isPlaying}
            >
              <Repeat className="h-4 w-4" />
              Repeat
            </Button>
            
            <Button 
              variant={isRecording ? "destructive" : "default"}
              onClick={toggleRecording}
              className="flex items-center gap-2"
              disabled={isPlaying || editingAnswer}
            >
              <Mic className="h-4 w-4" />
              {isRecording ? "Stop Recording" : "Answer Question"}
            </Button>
          </CardFooter>
        </Card>
        
        {editingAnswer && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingAnswer(false)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Answer
            </Button>
            <Button onClick={handleSubmitAnswer}>
              <Save className="mr-2 h-4 w-4" />
              Save & Submit
            </Button>
          </div>
        )}
      </div>
    );
  }

  return <div>Something went wrong</div>;
}

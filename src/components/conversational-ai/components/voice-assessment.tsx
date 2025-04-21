
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CircleStop, Edit, Mic, Play, Repeat, Save } from "lucide-react";
import { Question } from "../types/assessment-types";

interface VoiceAssessmentProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  answer: string | number;
  isPlaying: boolean;
  isRecording: boolean;
  editingAnswer: boolean;
  onAnswerChange: (questionId: number, answer: string | number) => void;
  onBack: () => void;
  onTogglePlayback: () => void;
  onToggleRecording: () => void;
  onSubmit: () => void;
  title: string;
}

export function VoiceAssessment({
  question,
  currentQuestionIndex,
  totalQuestions,
  answer,
  isPlaying,
  isRecording,
  editingAnswer,
  onAnswerChange,
  onBack,
  onTogglePlayback,
  onToggleRecording,
  onSubmit,
  title
}: VoiceAssessmentProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" onClick={onBack} className="mr-2">Back</Button>
        <h3 className="text-lg font-medium">
          {title} - Question {currentQuestionIndex + 1}/{totalQuestions}
        </h3>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="text-center">
          <CardTitle>Play and Repeat</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          {isPlaying ? (
            <div className="animate-pulse">
              <p className="text-lg font-medium">{question.text}</p>
              {question.type === "objective" && (
                <div className="mt-4 text-left max-w-md mx-auto">
                  <p className="font-medium mb-2">Options:</p>
                  <ul className="list-disc list-inside">
                    {question.options?.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">Click Play to hear the question</p>
          )}
          
          {editingAnswer && question.type === "subjective" && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Your recorded answer:</p>
              <Textarea
                value={answer as string || ""}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
          
          {editingAnswer && question.type === "objective" && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Your selection:</p>
              <RadioGroup 
                value={answer?.toString() || ""}
                onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
                className="space-y-3 max-w-md mx-auto"
              >
                {question.options?.map((option, index) => (
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
            onClick={onTogglePlayback}
            className="flex items-center gap-2"
          >
            {isPlaying ? <CircleStop className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Stop" : "Play"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onTogglePlayback}
            className="flex items-center gap-2"
            disabled={isPlaying}
          >
            <Repeat className="h-4 w-4" />
            Repeat
          </Button>
          
          <Button 
            variant={isRecording ? "destructive" : "default"}
            onClick={onToggleRecording}
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
          <Button variant="outline" onClick={() => onToggleRecording()}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Answer
          </Button>
          <Button onClick={onSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save & Submit
          </Button>
        </div>
      )}
    </div>
  );
}

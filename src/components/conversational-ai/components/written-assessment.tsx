
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { WrittenAssessmentProps } from "../types/assessment-types";

export function WrittenAssessment({
  question,
  currentQuestionIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  onBack,
  onSubmit,
  title
}: WrittenAssessmentProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" onClick={onBack} className="mr-2">Back</Button>
        <h3 className="text-lg font-medium">
          {title} - Question {currentQuestionIndex + 1}/{totalQuestions}
        </h3>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === "subjective" ? (
            <Textarea 
              placeholder="Type your answer here..."
              className="min-h-[150px]"
              value={answer as string || ""}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
            />
          ) : (
            <RadioGroup 
              value={answer?.toString() || ""}
              onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
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
            onClick={() => onAnswerChange(question.id, currentQuestionIndex - 1)}
          >
            Previous
          </Button>
          <Button onClick={onSubmit}>
            {currentQuestionIndex < totalQuestions - 1
              ? "Next Question"
              : "Submit Assessment"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

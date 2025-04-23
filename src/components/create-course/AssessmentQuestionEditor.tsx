
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { AssessmentQuestion } from "./types/assessment-types";
import QuestionTypeSelector from "./components/question-editor/QuestionTypeSelector";
import ObjectiveQuestionOptions from "./components/question-editor/ObjectiveQuestionOptions";
import SubjectiveQuestionEditor from "./components/question-editor/SubjectiveQuestionEditor";
import QuestionInput from "./components/question-editor/QuestionInput";
import { QUESTION_TYPES, DEFAULT_OPTIONS_LIMIT } from "./constants/assessment-constants";

interface Props {
  question: AssessmentQuestion;
  onChange: (q: AssessmentQuestion) => void;
  onRemove: () => void;
  objectiveOptionsLimit?: number;
}

const AssessmentQuestionEditor: React.FC<Props> = ({
  question,
  onChange,
  onRemove,
  objectiveOptionsLimit = DEFAULT_OPTIONS_LIMIT
}) => {
  // Handle question type change
  const handleTypeChange = (type: "objective" | "subjective") => {
    if (type === QUESTION_TYPES.OBJECTIVE) {
      onChange({
        ...question,
        type: QUESTION_TYPES.OBJECTIVE,
        options: question.options && question.options.length ? question.options : [
          { text: "", isCorrect: false }
        ],
        allowMultiple: false,
        answer: undefined,
        answerDocumentUrl: undefined,
      });
    } else {
      onChange({
        ...question,
        type: QUESTION_TYPES.SUBJECTIVE,
        options: undefined,
        allowMultiple: false,
        answer: "",
        answerDocumentUrl: undefined,
      });
    }
  };

  // Handle question text change
  const handleQuestionChange = React.useCallback((text: string) => {
    onChange({ ...question, question: text });
  }, [question, onChange]);

  // Option handling functions
  const handleOptionTextChange = React.useCallback((idx: number, value: string) => {
    if (question.options) {
      const options = [...question.options];
      options[idx].text = value;
      onChange({ ...question, options });
    }
  }, [question, onChange]);

  const handleOptionCorrectChange = React.useCallback((idx: number, checked: boolean) => {
    if (question.options) {
      let options = [...question.options];
      if (!question.allowMultiple) {
        options = options.map((opt, i) => ({ ...opt, isCorrect: i === idx ? checked : false }));
      } else {
        options[idx].isCorrect = checked;
      }
      onChange({ ...question, options });
    }
  }, [question, onChange]);

  const handleAddOption = React.useCallback(() => {
    const options = [...(question.options || [])];
    if (options.length < objectiveOptionsLimit) {
      options.push({ text: "", isCorrect: false });
      onChange({ ...question, options });
    }
  }, [question, onChange, objectiveOptionsLimit]);

  const handleRemoveOption = React.useCallback((idx: number) => {
    if (question.options) {
      const options = question.options.filter((_, i) => i !== idx);
      onChange({ ...question, options });
    }
  }, [question, onChange]);

  const handleMultipleAnswersChange = React.useCallback((checked: boolean) => {
    onChange({
      ...question,
      allowMultiple: checked,
      options: checked
        ? question.options
        : question.options?.map(opt => ({ ...opt, isCorrect: false })),
    });
  }, [question, onChange]);

  return (
    <div className="relative border rounded-lg p-4 mb-4 bg-background shadow-sm space-y-3">
      <button
        type="button"
        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
        aria-label="Remove question"
        onClick={onRemove}
      >
        <Trash2 />
      </button>
      
      {/* Question type selector */}
      <QuestionTypeSelector 
        currentType={question.type} 
        onTypeChange={handleTypeChange} 
      />
      
      {/* Question input */}
      <QuestionInput 
        question={question.question}
        onChange={handleQuestionChange}
        type={question.type}
      />
      
      {/* Objective Options */}
      {question.type === QUESTION_TYPES.OBJECTIVE && (
        <>
          <div className="flex gap-2 items-center mb-2">
            <span className="text-sm font-semibold">Allow Multiple Answers:</span>
            <Switch
              checked={!!question.allowMultiple}
              onCheckedChange={handleMultipleAnswersChange}
            />
          </div>
          
          {question.options && (
            <ObjectiveQuestionOptions
              options={question.options}
              allowMultiple={!!question.allowMultiple}
              onOptionTextChange={handleOptionTextChange}
              onOptionCorrectChange={handleOptionCorrectChange}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              optionsLimit={objectiveOptionsLimit}
            />
          )}
        </>
      )}
      
      {/* Subjective Model Answer & Upload */}
      {question.type === QUESTION_TYPES.SUBJECTIVE && (
        <SubjectiveQuestionEditor
          answer={question.answer}
          answerDocumentUrl={question.answerDocumentUrl}
          onAnswerChange={(value) => onChange({ ...question, answer: value })}
          onDocumentChange={(fileName) => onChange({ ...question, answerDocumentUrl: fileName })}
        />
      )}
    </div>
  );
};

export default React.memo(AssessmentQuestionEditor);

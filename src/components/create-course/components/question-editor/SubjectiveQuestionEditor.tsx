
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface SubjectiveQuestionEditorProps {
  answer: string | undefined;
  answerDocumentUrl: string | undefined;
  onAnswerChange: (answer: string) => void;
  onDocumentChange: (fileName: string) => void;
}

export default function SubjectiveQuestionEditor({
  answer,
  answerDocumentUrl,
  onAnswerChange,
  onDocumentChange
}: SubjectiveQuestionEditorProps) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <Textarea
        placeholder="Optional: Type model answer or requirements here..."
        className="my-2"
        value={answer || ""}
        onChange={e => onAnswerChange(e.target.value)}
      />
      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          Optional: Upload supporting document (PDF/DOCX/TXT/ZIP)
        </label>
        <Input 
          type="file" 
          accept=".pdf,.docx,.doc,.txt,.zip" 
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              onDocumentChange(e.target.files[0].name);
            }
          }}
        />
        {answerDocumentUrl && (
          <div className="text-xs mt-1 text-muted-foreground">File: {answerDocumentUrl}</div>
        )}
      </div>
    </div>
  );
}

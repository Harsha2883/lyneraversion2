
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { AssessmentMode } from "../types/assessment-types";

interface AssessmentModeSelectorProps {
  onModeSelect: (mode: AssessmentMode) => void;
  onBack: () => void;
  title: string;
}

export function AssessmentModeSelector({ onModeSelect, onBack, title }: AssessmentModeSelectorProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" onClick={onBack} className="mr-2">Back</Button>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors" 
          onClick={() => onModeSelect("write")}
        >
          <CardHeader>
            <CardTitle className="text-center">Written Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Type your answers to questions</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onModeSelect("voice")}
        >
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

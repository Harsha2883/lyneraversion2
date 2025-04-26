
import { useState } from "react";
import { toast } from "sonner";
import { Assessment, AssessmentMode } from "../types/assessment-types";
import { supabase } from "@/integrations/supabase/client";

export function useAssessmentState() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(false);
  const [audioResponse, setAudioResponse] = useState<string | null>(null);

  const handleSelectAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setAssessmentMode(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAudioResponse(null);
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

  const toggleRecording = async () => {
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate voice processing with the AI assistant
      if (selectedAssessment) {
        const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
        
        try {
          toast.info("Processing your voice response...");
          
          // In a real implementation, we would send the audio to the server
          // For now, we'll simulate it by sending the question to the AI assistant
          const { data, error } = await supabase.functions.invoke('ai-assistant', {
            body: { 
              content: currentQuestion.text, 
              contextType: "assessment",
              voiceEnabled: true
            }
          });
          
          if (error) throw error;
          
          // Simulate transcription based on AI response
          const simulatedAnswer = currentQuestion.type === "subjective" 
            ? "This is a simulated voice response that would be transcribed from the user's speech, using GPT-4o to generate a reasonable response to the question."
            : 0;
          
          handleAnswerChange(currentQuestion.id, simulatedAnswer);
          
          if (data.audio) {
            setAudioResponse(data.audio);
            
            // Create and play audio element
            const binaryAudio = atob(data.audio);
            const bytes = new Uint8Array(binaryAudio.length);
            for (let i = 0; i < binaryAudio.length; i++) {
              bytes[i] = binaryAudio.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            
            // Clean up the URL after playing
            audio.onended = () => {
              URL.revokeObjectURL(url);
            };
            
            // Play the audio after a short delay
            setTimeout(() => {
              audio.play();
            }, 500);
          }
          
          setIsRecording(false);
          setEditingAnswer(true);
          toast.success("Answer recorded");
        } catch (error) {
          console.error('Error processing voice:', error);
          toast.error('Failed to process voice response');
          setIsRecording(false);
        }
      }
    } else {
      toast.info("Started recording...");
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && selectedAssessment) {
      toast.info(`Playing question: ${selectedAssessment.questions[currentQuestionIndex].text}`);
      
      // Simulate text-to-speech with GPT-4o
      const playQuestion = async () => {
        try {
          const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
          
          const { data, error } = await supabase.functions.invoke('ai-assistant', {
            body: { 
              content: `Please read this question aloud: ${currentQuestion.text}`, 
              contextType: "assessment",
              voiceEnabled: true
            }
          });
          
          if (error) throw error;
          
          if (data.audio) {
            // Create and play audio element
            const binaryAudio = atob(data.audio);
            const bytes = new Uint8Array(binaryAudio.length);
            for (let i = 0; i < binaryAudio.length; i++) {
              bytes[i] = binaryAudio.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            
            // Stop playing when audio ends
            audio.onended = () => {
              setIsPlaying(false);
              URL.revokeObjectURL(url);
            };
            
            audio.play();
          } else {
            // Fallback if no audio is returned
            setTimeout(() => {
              setIsPlaying(false);
            }, 3000);
          }
        } catch (error) {
          console.error('Error playing question:', error);
          setTimeout(() => {
            setIsPlaying(false);
          }, 3000);
        }
      };
      
      playQuestion();
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
          setAudioResponse(null);
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

  const playAudioResponse = () => {
    if (audioResponse) {
      // Create and play audio element
      const binaryAudio = atob(audioResponse);
      const bytes = new Uint8Array(binaryAudio.length);
      for (let i = 0; i < binaryAudio.length; i++) {
        bytes[i] = binaryAudio.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      // Clean up the URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(url);
      };
      
      audio.play();
      toast.info("Playing audio response");
    } else {
      toast.info("No audio response available");
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
    audioResponse,
    handleSelectAssessment,
    handleSelectMode,
    handleBack,
    handleAnswerChange,
    toggleRecording,
    togglePlayback,
    handleSubmitAnswer,
    playAudioResponse
  };
}

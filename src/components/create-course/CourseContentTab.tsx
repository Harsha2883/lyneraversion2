
import { useState } from "react";
import DataBackedContent from "./DataBackedContent";
import AiBackedContent from "./AiBackedContent";
import { Button } from "@/components/ui/button";

export default function CourseContentTab() {
  const [mode, setMode] = useState<"data" | "ai">("data");

  const handleModeChange = (newMode: "data" | "ai") => {
    setMode(newMode);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "data" ? "default" : "outline"}
          onClick={() => handleModeChange("data")}
        >
          Data-backed
        </Button>
        <Button
          variant={mode === "ai" ? "default" : "outline"}
          onClick={() => handleModeChange("ai")}
        >
          AI-backed
        </Button>
      </div>
      <div>
        {mode === "data" ? <DataBackedContent /> : <AiBackedContent />}
      </div>
    </div>
  );
}

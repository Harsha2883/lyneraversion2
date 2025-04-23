
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AiBackedContent() {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aiContent, setAiContent] = useState("");
  const [sources, setSources] = useState("");

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length) {
      setUploadedFile(e.target.files[0]);
    }
  }

  function handleGenerateContent() {
    // Placeholder: In real implementation, call AI API and setAiContent().
    setAiContent("AI generated content will appear here...");
  }

  function handleSubmitContent() {
    alert("Content saved (placeholder). In production, connect to the database.");
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Textarea
        placeholder="Give outlines or paste content"
        value={outline}
        onChange={(e) => setOutline(e.target.value)}
      />
      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileUpload}
        />
        {uploadedFile && (
          <span className="ml-2 text-xs">{uploadedFile.name}</span>
        )}
      </div>
      <Button onClick={handleGenerateContent} type="button">
        Generate with AI
      </Button>
      <Textarea
        placeholder="AI-generated content will appear here"
        value={aiContent}
        onChange={(e) => setAiContent(e.target.value)}
        rows={8}
        className="rounded border"
      />
      <Textarea
        placeholder="Cite sources (URL or comments, optional)"
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        rows={2}
      />
      <Button onClick={handleSubmitContent} type="button">
        Submit Content
      </Button>
    </div>
  );
}

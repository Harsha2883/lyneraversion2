
import { useState } from "react";
import ModuleEditor, { Module } from "./ModuleEditor";
import { BadgeDollarSign, FileText, FileAudio, FileVideo, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataBackedContent() {
  const [modules, setModules] = useState<Module[]>([]);

  function handleAddModule(type: Module["type"]) {
    setModules([
      ...modules,
      { id: Date.now(), type, title: "", free: true, source: "", url: "" },
    ]);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => handleAddModule("document")}>
          <FileText className="mr-1" /> Add Document
        </Button>
        <Button variant="secondary" onClick={() => handleAddModule("video")}>
          <FileVideo className="mr-1" /> Add Video
        </Button>
        <Button variant="secondary" onClick={() => handleAddModule("ebook")}>
          <BadgeDollarSign className="mr-1" /> Add E-Book/Zip
        </Button>
        <Button variant="secondary" onClick={() => handleAddModule("podcast")}>
          <FileAudio className="mr-1" /> Add Podcast
        </Button>
      </div>
      <div className="space-y-4">
        {modules.length === 0 && (
          <div className="text-center text-muted-foreground text-sm">
            No modules yet. Use the buttons above to add modules.
          </div>
        )}
        {modules.map((mod, idx) => (
          <ModuleEditor
            key={mod.id}
            module={mod}
            onChange={(updated) => {
              setModules(
                modules.map((m, i) => (i === idx ? updated : m))
              );
            }}
            onRemove={() => {
              setModules(modules.filter((_, i) => i !== idx));
            }}
          />
        ))}
      </div>
    </div>
  );
}

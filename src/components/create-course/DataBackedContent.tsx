
import { useState, useRef } from "react";
import ModuleEditor, { Module } from "./ModuleEditor";
import { BadgeDollarSign, FileText, FileAudio, FileVideo, Plus, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODULE_TYPES = [
  { type: "document", label: "Document", icon: FileText },
  { type: "video", label: "Video", icon: FileVideo },
  { type: "ebook", label: "E-Book/Zip", icon: BadgeDollarSign },
  { type: "podcast", label: "Podcast", icon: FileAudio },
] as const;

type ModuleType = Module["type"];

export default function DataBackedContent() {
  const [modules, setModules] = useState<Module[]>([]);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  function addModule(type: ModuleType) {
    setModules([
      ...modules,
      { id: Date.now() + Math.random(), type, title: "", free: true, source: "", url: "" }
    ]);
    setShowTypeMenu(false);
  }

  // Drag & drop handlers
  function handleDragStart(idx: number) {
    dragItem.current = idx;
  }
  function handleDragEnter(idx: number) {
    dragOverItem.current = idx;
  }
  function handleDragEnd() {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }
    const updated = [...modules];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setModules(updated);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-center">
        <Button
          variant="default"
          size="lg"
          className="mb-2 flex items-center gap-2 text-base"
          onClick={() => setShowTypeMenu((v) => !v)}
        >
          <Plus className="mr-1" />
          Add Module
        </Button>
        {showTypeMenu && (
          <div className="flex flex-wrap gap-2 bg-muted border rounded-lg px-4 py-3 shadow-lg z-10">
            {MODULE_TYPES.map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => addModule(type)}
              >
                <Icon className="mr-1" />
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-4">
        {modules.length === 0 && (
          <div className="text-center text-muted-foreground text-sm">
            No modules yet. Use the "Add Module" button above to add modules.
          </div>
        )}
        {modules.map((mod, idx) => (
          <div
            key={mod.id}
            className={`flex items-start group rounded-lg border bg-background transition-shadow 
              ${dragItem.current === idx ? "opacity-70 ring-2 ring-primary/70" : ""}
              ${dragOverItem.current === idx && dragItem.current !== null ? "ring-2 ring-accent" : ""}
            `}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => dragItem.current !== null && handleDragEnter(idx)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Drag handle and Module number */}
            <div className="flex flex-col items-center px-2 py-4 cursor-grab">
              <Move className="mb-2 text-muted-foreground" />
              <div className="font-bold text-lg text-primary/80">{idx + 1}</div>
            </div>
            <div className="flex-1">
              <ModuleEditor
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


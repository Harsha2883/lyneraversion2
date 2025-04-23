import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export type Module = {
  id: number;
  type: "document" | "video" | "ebook" | "podcast";
  title: string;
  free: boolean;
  source: string;
  url?: string;
};

const typeLabels: Record<Module["type"], string> = {
  document: "Document",
  video: "Video",
  ebook: "E-book/Zip",
  podcast: "Podcast",
};

interface ModuleEditorProps {
  module: Module;
  onChange: (mod: Module) => void;
  onRemove: () => void;
}

export default function ModuleEditor({ module, onChange, onRemove }: ModuleEditorProps) {
  const [local, setLocal] = useState(module);

  return (
    <div className="rounded-lg border p-4 shadow-md bg-background space-y-3 relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive"
        aria-label="Remove module"
        type="button"
      >
        <X />
      </button>
      <div className="flex gap-2 items-center">
        <div className="font-medium">{typeLabels[local.type]}</div>
        <span className="text-xs px-2 py-1 rounded bg-accent">
          {local.free ? "Free" : "Premium"}
        </span>
        <Switch
          checked={local.free}
          onCheckedChange={(val) => {
            setLocal((m) => ({ ...m, free: val }));
            onChange({ ...local, free: val });
          }}
        />
        <span className="text-xs ml-1">Toggle Free/Premium</span>
      </div>
      <Input
        className="my-2"
        placeholder="Module Title"
        value={local.title}
        onChange={(e) => {
          setLocal((m) => ({ ...m, title: e.target.value }));
          onChange({ ...local, title: e.target.value });
        }}
      />
      {local.type === "video" && (
        <Input
          className="my-2"
          placeholder="YouTube Link or Upload"
          value={local.url || ""}
          onChange={(e) => {
            setLocal((m) => ({ ...m, url: e.target.value }));
            onChange({ ...local, url: e.target.value });
          }}
        />
      )}
      <Textarea
        className="my-2"
        placeholder={`Cite sources (URL or comments, optional)`}
        value={local.source}
        onChange={(e) => {
          setLocal((m) => ({ ...m, source: e.target.value }));
          onChange({ ...local, source: e.target.value });
        }}
        rows={2}
      />
    </div>
  );
}

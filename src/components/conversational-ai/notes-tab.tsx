
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

export function NotesTab() {
  // Mocked data for demonstration
  const notes = [
    { id: 1, title: "Sustainability Basics", content: "Key concepts in environmental sustainability..." },
    { id: 2, title: "Carbon Footprint", content: "Understanding and calculating carbon emissions..." }
  ];

  return (
    <div className="mt-6 grid gap-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader className="flex flex-row items-center gap-2">
            <StickyNote className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Mail, Plus, StickyNote, Trash, Mic } from "lucide-react";

export function NotesTab() {
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: "Sustainability Basics", 
      content: "Key concepts in environmental sustainability...",
      source: "learning-session"
    },
    { 
      id: 2, 
      title: "Carbon Footprint", 
      content: "Understanding and calculating carbon emissions...",
      source: "learning-session"
    },
    { 
      id: 3, 
      title: "Question: How do carbon credits work?", 
      content: "Carbon credits represent a reduction of greenhouse gases in the atmosphere. Companies can purchase these credits to offset their emissions. One carbon credit equals one metric ton of carbon dioxide or equivalent greenhouse gas.",
      source: "question" 
    },
    { 
      id: 4, 
      title: "Question: What are the main components of ESG?", 
      content: "ESG stands for Environmental, Social, and Governance. Environmental criteria examine how a company performs as a steward of nature. Social criteria look at how it manages relationships with employees, suppliers, customers, and communities. Governance deals with a company's leadership, executive pay, audits, internal controls, and shareholder rights.",
      source: "question" 
    }
  ]);

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      toast.error("Please provide both a title and content for your note");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      source: "manual"
    };

    setNotes([...notes, newNote]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddNoteOpen(false);
    toast.success("Note added successfully");
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Note deleted successfully");
  };

  const handleDownloadNote = (note: any) => {
    const element = document.createElement("a");
    const file = new Blob([`${note.title}\n\n${note.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Note downloaded");
  };

  const handleEmailNote = (note: any) => {
    // In a real implementation, this would connect to an email service
    toast.success("Note has been emailed to you");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast.info("Started recording... Speak now");
    } else {
      // In a real implementation, this would process the recording
      const transcribedText = "This is a simulated transcript of your voice recording.";
      setNewNoteContent(prev => prev + (prev ? "\n\n" : "") + transcribedText);
      toast.success("Recording transcribed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Learning Notes</h3>
        <Button onClick={() => setIsAddNoteOpen(true)} variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Add Note
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Card key={note.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-2 bg-muted/50 pb-2">
              <StickyNote className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-medium">
                {note.title}
              </CardTitle>
              {note.source === "question" && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  From Question
                </span>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                {note.content.length > 150 
                  ? `${note.content.substring(0, 150)}...` 
                  : note.content
                }
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 p-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDownloadNote(note)}
                title="Download note"
              >
                <Download size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEmailNote(note)}
                title="Email note"
              >
                <Mail size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDeleteNote(note.id)}
                title="Delete note"
              >
                <Trash size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Enter note title..."
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Button 
                  type="button" 
                  variant={isRecording ? "destructive" : "outline"} 
                  size="sm"
                  onClick={toggleRecording}
                  className="flex items-center gap-1"
                >
                  <Mic size={14} />
                  {isRecording ? "Stop Recording" : "Record"}
                </Button>
              </div>
              <Textarea
                id="content"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Enter note content..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

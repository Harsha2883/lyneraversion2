
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// These would typically come from your backend or AI service
const getSEORecommendations = (input: string): string[] => {
  // This is a mock implementation. In a real application, this would make an API call
  // to get AI-powered recommendations based on the input and course content
  const recommendations = [
    "sustainable development",
    "environmental impact",
    "carbon footprint",
    "green initiatives",
    "climate change",
    "renewable energy",
    "corporate sustainability",
    "environmental policy",
  ];
  
  return recommendations.filter(tag => 
    tag.toLowerCase().includes(input.toLowerCase())
  ).slice(0, 5);
};

interface TagSelectorProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

export function TagSelector({ tags, onChange, maxTags = 10 }: TagSelectorProps) {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (input.trim()) {
      const newRecommendations = getSEORecommendations(input);
      setRecommendations(newRecommendations);
    } else {
      setRecommendations([]);
    }
  }, [input]);

  const addTag = (tag: string) => {
    if (tags.length >= maxTags) {
      toast.warning(`Maximum ${maxTags} tags allowed`);
      return;
    }
    if (!tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput("");
    setRecommendations([]);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary"
            className="cursor-pointer"
            onClick={() => removeTag(tag)}
          >
            {tag} ×
          </Badge>
        ))}
      </div>
      
      {tags.length < maxTags && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type to add tags..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  e.preventDefault();
                  addTag(input.trim());
                }
              }}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => input.trim() && addTag(input.trim())}
              disabled={!input.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {recommendations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recommendations.map(rec => (
                <Badge
                  key={rec}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => addTag(rec)}
                >
                  {rec}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Handle = {
  name: string;
  value: string;
  url?: string;
};

const handles: Handle[] = [
  { name: "LinkedIn", value: "@creator-linkedin", url: "#" },
  { name: "Twitter", value: "@climate_innovator", url: "#" },
];

export function SocialMediaHandles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Social Media Handles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {handles.map((h) => (
            <div key={h.name} className="flex items-center gap-2">
              <Badge variant="secondary">{h.name}</Badge>
              {h.url ? (
                <a
                  href={h.url}
                  className="text-sm text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {h.value}
                </a>
              ) : (
                <span className="text-sm">{h.value}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

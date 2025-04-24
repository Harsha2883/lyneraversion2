
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OffsetProject {
  id: number;
  title: string;
  description: string;
  price: string;
  rating: number;
  tag: string;
  imageUrl: string;
}

interface OffsetProjectCardProps {
  project: OffsetProject;
}

export function OffsetProjectCard({ project }: OffsetProjectCardProps) {
  return (
    <Card key={project.id}>
      <div className="aspect-video relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm">
          {project.price}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-sm font-medium ml-1">{project.rating}</span>
          </div>
          <span className="text-sm text-green-600">{project.tag}</span>
        </div>
        <Button className="w-full" variant="default">
          Contribute
        </Button>
      </CardContent>
    </Card>
  );
}

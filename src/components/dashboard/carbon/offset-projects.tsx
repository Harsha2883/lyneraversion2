import { OffsetProjectCard } from "./offset-project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const offsetProjects = [
  {
    id: 1,
    title: "Amazonia Reforestation Initiative",
    description: "Reforestation project in the Amazon rainforest, focusing on native species and biodiversity preservation.",
    price: "$15/ton",
    rating: 4.8,
    tag: "reforestation",
    imageUrl: "placeholder.svg"
  },
  {
    id: 2,
    title: "Solar Energy for Rural Communities",
    description: "Provides solar panels to rural communities, replacing fossil fuel generators and kerosene lamps.",
    price: "$18/ton",
    rating: 4.6,
    tag: "renewable",
    imageUrl: "placeholder.svg"
  },
  {
    id: 3,
    title: "Coral Reef Conservation Program",
    description: "Protection and restoration of coral reefs, which are vital carbon sinks and marine habitats.",
    price: "$22/ton",
    rating: 4.7,
    tag: "conservation",
    imageUrl: "placeholder.svg"
  }
];

export function OffsetProjects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="rounded-lg border shadow-sm">
            <Skeleton className="aspect-video w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {offsetProjects.map((project) => (
        <OffsetProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

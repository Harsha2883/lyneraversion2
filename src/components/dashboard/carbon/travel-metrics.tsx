import { Car, Plane, Smartphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export function TravelMetrics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
            <Skeleton className="h-5 w-5" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
        <Car className="h-5 w-5 text-gray-500" />
        <div>
          <div className="text-sm font-medium">378 km</div>
          <div className="text-xs text-muted-foreground">Car travel avoided</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
        <Plane className="h-5 w-5 text-gray-500" />
        <div>
          <div className="text-sm font-medium">504 km</div>
          <div className="text-xs text-muted-foreground">Flight distance equivalent</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
        <Smartphone className="h-5 w-5 text-gray-500" />
        <div>
          <div className="text-sm font-medium">3023 charges</div>
          <div className="text-xs text-muted-foreground">Smartphone charges equivalent</div>
        </div>
      </div>
    </div>
  );
}

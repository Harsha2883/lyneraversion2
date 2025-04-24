
import { Car, Plane, Smartphone } from "lucide-react";

export function TravelMetrics() {
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

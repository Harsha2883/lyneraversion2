
import { Card, CardContent } from "@/components/ui/card";
import { Car, Plane, Smartphone } from "lucide-react";

export function SustainabilityMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Total CO2 Saved</div>
          <div className="text-2xl font-bold text-green-600">45.35kg</div>
          <div className="text-xs text-muted-foreground">Compared to traditional in-person learning</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Water Saved</div>
          <div className="text-2xl font-bold text-blue-600">285 L</div>
          <div className="text-xs text-muted-foreground">By not traveling to physical classrooms</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Your CO2 Footprint</div>
          <div className="text-2xl font-bold text-amber-600">1.35kg</div>
          <div className="text-xs text-muted-foreground">Total from your online learning activities</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Efficiency Ratio</div>
          <div className="text-2xl font-bold text-purple-600">97%</div>
          <div className="text-xs text-muted-foreground">CO2 reduction compared to in-person learning</div>
        </CardContent>
      </Card>
    </div>
  );
}

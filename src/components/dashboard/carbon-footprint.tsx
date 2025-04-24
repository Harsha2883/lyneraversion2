
import { Leaf } from "lucide-react";
import { SustainabilityMetrics } from "./carbon/sustainability-metrics";
import { TravelMetrics } from "./carbon/travel-metrics";
import { OffsetProjects } from "./carbon/offset-projects";
import { SustainabilityTips } from "./carbon/sustainability-tips";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function CarbonFootprint() {
  return (
    <div className="space-y-6">
      <section className="bg-green-50/50 rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Your Sustainability Impact
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Summary of your environmental impact through sustainable learning
        </p>
        
        <ErrorBoundary>
          <SustainabilityMetrics />
        </ErrorBoundary>
        <ErrorBoundary>
          <TravelMetrics />
        </ErrorBoundary>
      </section>

      <section className="bg-white rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Leaf className="h-5 w-5 text-green-500" />
          Carbon Footprint by Course
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Detailed analysis of your environmental impact for each course
        </p>
      </section>

      <section className="bg-white rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Offset Your Carbon Footprint
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Contribute to environmental projects to neutralize your remaining carbon impact
        </p>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium mb-1">Lynera.ai is already carbon-efficient</h3>
          <p className="text-sm text-muted-foreground">
            While your online learning has a minimal carbon footprint compared to traditional methods, you can offset your remaining impact by supporting these verified projects.
          </p>
        </div>

        <ErrorBoundary>
          <OffsetProjects />
        </ErrorBoundary>
      </section>

      <section className="bg-green-50/50 rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Leaf className="h-5 w-5 text-green-500" />
          Sustainability Learning Tips
        </h2>
        
        <ErrorBoundary>
          <SustainabilityTips />
        </ErrorBoundary>
      </section>
    </div>
  );
}


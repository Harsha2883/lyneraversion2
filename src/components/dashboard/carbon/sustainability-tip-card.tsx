
import { LucideIcon } from "lucide-react";

interface SustainabilityTip {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SustainabilityTipCardProps {
  tip: SustainabilityTip;
}

export function SustainabilityTipCard({ tip }: SustainabilityTipCardProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-start gap-3">
        <tip.icon className="h-5 w-5 text-green-500 mt-1" />
        <div>
          <h3 className="font-medium mb-1">{tip.title}</h3>
          <p className="text-sm text-muted-foreground">{tip.description}</p>
        </div>
      </div>
    </div>
  );
}

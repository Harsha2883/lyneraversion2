
import { MonitorSmartphone, DownloadCloud, Lightbulb } from "lucide-react";
import { SustainabilityTipCard } from "./sustainability-tip-card";

const tips = [
  {
    title: "Lower screen brightness",
    description: "Reducing screen brightness by 30% can save significant energy during long learning sessions.",
    icon: MonitorSmartphone
  },
  {
    title: "Download content for offline use",
    description: "Streaming uses more energy than viewing downloaded content, especially on mobile networks.",
    icon: DownloadCloud
  },
  {
    title: "Use low-power mode",
    description: "Enable your device's power-saving features during long study sessions to reduce energy consumption.",
    icon: Lightbulb
  }
];

export function SustainabilityTips() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tips.map((tip, index) => (
        <SustainabilityTipCard key={index} tip={tip} />
      ))}
    </div>
  );
}

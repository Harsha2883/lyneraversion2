import { MonitorSmartphone, DownloadCloud, Lightbulb } from "lucide-react";
import { SustainabilityTipCard } from "./sustainability-tip-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 mt-1" />
              <div className="flex-1">
                <Skeleton className="h-5 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tips.map((tip, index) => (
        <SustainabilityTipCard key={index} tip={tip} />
      ))}
    </div>
  );
}

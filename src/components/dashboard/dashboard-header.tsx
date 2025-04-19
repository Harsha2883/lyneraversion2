
import { CalendarClock } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center pb-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <CalendarClock className="h-4 w-4" />
        <span>{today}</span>
      </div>
    </div>
  );
}

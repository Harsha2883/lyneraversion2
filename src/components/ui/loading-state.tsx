
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  className?: string;
}

export function LoadingState({ className = "" }: LoadingStateProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Skeleton className="h-12 w-[300px] mx-auto rounded-lg" />
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[480px] w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

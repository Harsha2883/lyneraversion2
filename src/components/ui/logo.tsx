
import { Leaf } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({ size = "md", variant = "full" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Leaf className="text-primary h-6 w-6" />
        <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent"></div>
      </div>
      {variant === "full" && (
        <div>
          <div className={`font-bold ${sizes[size]} text-primary tracking-tight`}>
            Lynera<span className="text-accent">.ai</span>
          </div>
          <div className="text-xs text-muted-foreground leading-tight">
            Your learning companion for sustainable life
          </div>
        </div>
      )}
    </div>
  );
}

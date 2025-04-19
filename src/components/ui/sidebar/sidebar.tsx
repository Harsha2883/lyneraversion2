
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON } from "./sidebar-context";
import { Menu } from "lucide-react";

export function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  const { state, isMobile } = useSidebar();
  
  return (
    <aside
      data-sidebar="root"
      data-state={state}
      style={
        {
          "--width": isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
          "--width-icon": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
      className={cn(
        "group/sidebar relative z-30 h-full shrink-0 select-none overflow-hidden border-r bg-background data-[state=expanded]:w-[--width] data-[state=collapsed]:w-[--width-icon] motion-safe:transition-[width]",
        className
      )}
      {...props}
    />
  );
}

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      onClick={toggleSidebar}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}

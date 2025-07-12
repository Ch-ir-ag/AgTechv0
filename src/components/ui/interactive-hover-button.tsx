import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-transparent p-2 px-6 text-center font-semibold transition-all duration-300 hover:bg-[#F7F5F0] hover:text-[#1E4B3A]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 relative z-10">
        <div className="h-2 w-2 rounded-full bg-current transition-all duration-300 group-hover:scale-110"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-1">
          {children}
        </span>
        <ArrowRight className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton"; 
import { ReactNode, forwardRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
  delay?: number;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className, animation = "fade-up", delay = 0 }, _ref) => {
    const { ref, isVisible } = useScrollAnimation(0.15);

    const animationClasses = {
      "fade-up": "translate-y-8 opacity-0",
      "fade-left": "-translate-x-8 opacity-0",
      "fade-right": "translate-x-8 opacity-0",
      "scale": "scale-95 opacity-0",
    };

    const visibleClasses = "translate-y-0 translate-x-0 scale-100 opacity-100";

    return (
      <section
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-out",
          isVisible ? visibleClasses : animationClasses[animation],
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </section>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";

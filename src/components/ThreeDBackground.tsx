import { useMemo } from "react";

interface ThreeDBackgroundProps {
  className?: string;
}

export const ThreeDBackground = ({ className }: ThreeDBackgroundProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${8 + Math.random() * 10}s`,
      })),
    []
  );

  return (
    <div className={className} aria-hidden="true" style={{ pointerEvents: "none" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.2),transparent_40%),radial-gradient(circle_at_80%_30%,hsl(var(--primary-foreground)/0.12),transparent_45%),radial-gradient(circle_at_50%_90%,hsl(var(--accent)/0.15),transparent_35%)]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute block h-1 w-1 rounded-full bg-accent/50 animate-pulse"
          style={{
            top: particle.top,
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
};

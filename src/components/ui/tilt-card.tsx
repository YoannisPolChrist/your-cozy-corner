import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps { children: React.ReactNode; className?: string; tiltStrength?: number; glareEnabled?: boolean; perspective?: number; }

export const TiltCard = ({ children, className = "", tiltStrength = 10, glareEnabled = true, perspective = 1000 }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    setTransform({ rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -tiltStrength, rotateY: ((x - rect.width / 2) / (rect.width / 2)) * tiltStrength });
    if (glareEnabled) setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };
  const handleMouseLeave = () => { setTransform({ rotateX: 0, rotateY: 0 }); setGlare({ x: 50, y: 50, opacity: 0 }); };

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} animate={{ rotateX: transform.rotateX, rotateY: transform.rotateY }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ perspective, transformStyle: "preserve-3d" }} className={`relative ${className}`}>
      {children}
      {glareEnabled && <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)` }} />}
    </motion.div>
  );
};

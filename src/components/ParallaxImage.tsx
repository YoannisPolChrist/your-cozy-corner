import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxStrength?: number; // 0.1 = subtle, 0.3 = strong
  scale?: boolean;
}

export const ParallaxImage = ({
  src,
  alt,
  className = "",
  parallaxStrength = 0.1,
  scale = true,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle vertical movement - reduced for smoother effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxStrength * 50}%`, `-${parallaxStrength * 50}%`]
  );

  // Subtle scale effect - reduced intensity
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale ? [1.02, 1, 1.02] : [1, 1, 1]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ 
          y, 
          scale: imageScale,
          willChange: 'transform'
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ParallaxImage;

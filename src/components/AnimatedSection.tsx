import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { 
  fadeUp, 
  staggerContainer, 
  staggerItem,
  cardStagger,
  cardItem,
  viewportSettings 
} from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

// Main section wrapper with cinematic fade up
export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) => {
  const variants = stagger ? staggerContainer : fadeUp;
  
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={variants}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Stagger container for child animations (Domino Effect)
export const StaggerContainer = ({
  children,
  className,
  asCards = false,
}: {
  children: ReactNode;
  className?: string;
  asCards?: boolean;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={asCards ? cardStagger : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual animated item for stagger effects
export const AnimatedItem = ({
  children,
  className,
  asCard = false,
}: {
  children: ReactNode;
  className?: string;
  asCard?: boolean;
}) => {
  return (
    <motion.div 
      variants={asCard ? cardItem : staggerItem} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Export item variants for direct use
export const itemVariants: Variants = staggerItem;

AnimatedSection.displayName = "AnimatedSection";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    /** Delay between words in seconds. Default: 0.04 */
    wordDelay?: number;
    /** Base animation duration per word. Default: 0.5 */
    duration?: number;
    /** Tailwind/custom classes for each word span */
    wordClassName?: string;
}

/**
 * Reveals text word-by-word as the element enters the viewport.
 * Automatically disables animation if user prefers reduced motion.
 */
export const ScrollRevealText = ({
    text,
    className,
    wordDelay = 0.04,
    duration = 0.5,
    wordClassName,
}: ScrollRevealTextProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const shouldReduceMotion = useReducedMotion();

    const words = text.split(" ");

    return (
        <span ref={ref} className={cn("inline", className)} aria-label={text}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className={cn("inline-block mr-[0.25em]", wordClassName)}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0 }
                            : shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: 0, y: 16 }
                    }
                    transition={{
                        duration: shouldReduceMotion ? 0 : duration,
                        delay: shouldReduceMotion ? 0 : i * wordDelay,
                        ease: [0.2, 0.8, 0.2, 1],
                    }}
                    aria-hidden="true"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollRevealDirection = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: ScrollRevealDirection;
    distance?: number;
    /** How much of the viewport the element travels through (scroll range). Lower = faster reveal. */
    scrollRange?: [number, number];
    /** Enable a parallax offset based on scroll position */
    parallax?: boolean;
    parallaxStrength?: number;
    /** Delay the reveal relative to scroll position */
    delay?: number;
}

/**
 * ScrollReveal — A scroll-driven reveal component that animates content
 * based on scroll position (not time). Content appears to be "uncovered"
 * as the user scrolls.
 */
export const ScrollReveal = ({
    children,
    className = "",
    direction = "up",
    distance = 60,
    scrollRange = [0, 1],
    parallax = false,
    parallaxStrength = 50,
    delay = 0,
}: ScrollRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Offset for staggered effects
    const adjustedStart = Math.min(scrollRange[0] + delay, 0.9);
    const adjustedEnd = Math.min(scrollRange[1] + delay, 1);

    const opacity = useTransform(scrollYProgress, [adjustedStart, adjustedEnd * 0.6], [0, 1]);

    const getTranslate = () => {
        switch (direction) {
            case "up":
                return useTransform(scrollYProgress, [adjustedStart, adjustedEnd * 0.6], [distance, 0]);
            case "down":
                return useTransform(scrollYProgress, [adjustedStart, adjustedEnd * 0.6], [-distance, 0]);
            case "left":
                return useTransform(scrollYProgress, [adjustedStart, adjustedEnd * 0.6], [distance, 0]);
            case "right":
                return useTransform(scrollYProgress, [adjustedStart, adjustedEnd * 0.6], [-distance, 0]);
        }
    };

    const translate = getTranslate();
    const isHorizontal = direction === "left" || direction === "right";

    const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                ...(isHorizontal ? { x: translate } : { y: translate }),
                ...(parallax ? { y: parallaxY } : {}),
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

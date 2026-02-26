import { type ElementType, type ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

interface ThreeDIconProps {
    icon: ElementType;
    className?: string;
    color?: string;
    size?: number;
    delay?: number;
    strokeWidth?: number;
}

/**
 * A wrapper that gives any Lucide icon a premium 3D floating look
 * using pure CSS transforms + Framer Motion. No WebGL needed.
 *
 * It works by layering:
 * 1. A blurred, colored "shadow" copy of the icon behind (the depth / extrude effect)
 * 2. The real icon on top with a highlight tint
 * 3. A subtle specular glare circle
 */
export function ThreeDIcon({ icon: Icon, className = "", color = "currentColor", size = 48, delay = 0, strokeWidth = 1.5 }: ThreeDIconProps) {
    return (
        <motion.div
            className={`relative inline-flex items-center justify-center ${className}`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            style={{ perspective: "200px" }}
        >
            {/* Depth layer 1 – outer warm glow */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    filter: `blur(8px) brightness(0.8)`,
                    transform: "translateZ(-8px) translate(4px, 6px) scale(0.9)",
                    opacity: 0.35,
                }}
            >
                <Icon style={{ width: size, height: size, color }} strokeWidth={strokeWidth} />
            </div>

            {/* Depth layer 2 – closer mid shadow */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    filter: "blur(3px) brightness(0.9)",
                    transform: "translateZ(-4px) translate(2px, 3px) scale(0.95)",
                    opacity: 0.5,
                }}
            >
                <Icon style={{ width: size, height: size, color }} strokeWidth={strokeWidth} />
            </div>

            {/* Top layer – the real icon */}
            <motion.div
                className="relative z-10 flex items-center justify-center"
                whileHover={{ rotateY: 12, rotateX: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <Icon style={{ width: size, height: size, color }} strokeWidth={strokeWidth} />
                {/* Specular glare */}
                <div
                    className="absolute top-[10%] left-[20%] w-[30%] h-[20%] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, transparent 100%)",
                        filter: "blur(3px)",
                        transform: "rotate(-30deg)",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

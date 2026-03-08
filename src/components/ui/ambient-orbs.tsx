import { motion } from "framer-motion";

interface OrbConfig {
    size: number;
    color: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    opacity: number;
    duration: number;
    delay?: number;
}

const ORBS_DARK: OrbConfig[] = [
    { size: 260, color: '#1a7a8a', top: '-80px', left: '-80px', opacity: 0.35, duration: 6, delay: 0 },
    { size: 300, color: '#B08C57', top: '10%', right: '-10%', opacity: 0.2, duration: 7.5, delay: 1 },
    { size: 250, color: '#1F2528', bottom: '-10%', right: '20%', opacity: 0.3, duration: 5.5, delay: 0.5 },
];

export const AmbientOrbs = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {ORBS_DARK.map((config, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: config.size,
                        height: config.size,
                        borderRadius: '50%',
                        backgroundColor: config.color,
                        filter: `blur(${Math.max(80, config.size * 0.4)}px)`,
                        top: config.top,
                        bottom: config.bottom,
                        left: config.left,
                        right: config.right,
                    }}
                    initial={{ opacity: config.opacity * 0.5, scale: 0.9 }}
                    animate={{ opacity: config.opacity, scale: 1.1 }}
                    transition={{
                        duration: config.duration,
                        delay: config.delay || 0,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

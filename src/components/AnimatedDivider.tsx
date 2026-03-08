import { motion } from "framer-motion";

interface AnimatedDividerProps {
    className?: string;
    delay?: number;
}

export const AnimatedDivider = ({ className = "", delay = 0 }: AnimatedDividerProps) => {
    return (
        <div className={`w-full flex justify-center py-12 md:py-16 ${className}`}>
            <motion.div
                className="h-[1px] relative overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay, ease: [0.25, 1, 0.5, 1] }}
            >
                <div className="absolute inset-0 bg-gold-accent/20" />
                <motion.div
                    className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-gold-accent/80 to-transparent"
                    animate={{ x: ["-200%", "400%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
            </motion.div>
        </div>
    );
};

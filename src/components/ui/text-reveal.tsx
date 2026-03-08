import { motion, Variants } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    centered?: boolean;
}

export const TextReveal = ({ text, className = "", delay = 0, centered = true }: TextRevealProps) => {
    const words = text.split(" ");

    const container: Variants = {
        revealHidden: { opacity: 0 },
        revealVisible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay },
        },
    };

    const child: Variants = {
        revealHidden: { opacity: 0, y: 40, filter: "blur(12px)" },
        revealVisible: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${centered ? 'justify-center' : 'justify-start'} ${className}`}
            variants={container}
            initial="revealHidden"
            whileInView="revealVisible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((word, index) => (
                <motion.span variants={child} className="mr-[0.25em]" key={index}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

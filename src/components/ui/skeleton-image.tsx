import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkeletonImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
}

/**
 * SkeletonImage — Shows a beautiful shimmer placeholder while an image loads,
 * then gracefully fades in the real image.
 */
export const SkeletonImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    loading = "lazy",
}: SkeletonImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Skeleton shimmer */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10"
                    >
                        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual image */}
            <motion.img
                src={src}
                alt={alt}
                className={className}
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                onLoad={handleLoad}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.02,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
        </div>
    );
};

import { Variants } from "framer-motion";

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: cinematicEase }
  }
};

export const goldFrameVariants: Variants = {
  hidden: { opacity: 0, x: -15, y: -15, scale: 0.97 },
  visible: {
    opacity: 1, x: 0, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.15, ease: cinematicEase }
  }
};

export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: cinematicEase }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const cardStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.25, ease: "easeOut" }
};

export const iconStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
};

export const iconItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: cinematicEase }
  }
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: cinematicEase }
  }
};

export const viewportSettings = {
  once: true,
  amount: 0.15 as const,
  margin: "0px" as const
};

export const mobileViewportSettings = {
  once: true,
  amount: 0.01 as const,
  margin: "-80px" as const
};

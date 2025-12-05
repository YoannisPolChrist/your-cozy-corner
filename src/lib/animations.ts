import { Variants } from "framer-motion";

// Cinematic easing curve - heavy, expensive, smooth
export const cinematicEase = [0.2, 0.8, 0.2, 1] as const;

// Standard fade up animation - The primary movement
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: cinematicEase,
    }
  }
};

// Mobile-optimized fade up (reduced y distance)
export const fadeUpMobile: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: cinematicEase,
    }
  }
};

// Gold frame parallax - delayed slide out effect
export const goldFrameVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -30,
    y: -30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      delay: 0.3,
      ease: cinematicEase,
    }
  }
};

// Image fade in (slightly faster than gold frame)
export const imageVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    }
  }
};

// Stagger container - The "Domino Effect"
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

// Stagger item for children
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: cinematicEase,
    }
  }
};

// Card stagger - specific for card grids
export const cardStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

// Card item animation
export const cardItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: cinematicEase,
    }
  }
};

// Subtle scale for hover effects
export const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.4, ease: cinematicEase }
};

// Icon stagger animation
export const iconStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    }
  }
};

// Icon item animation
export const iconItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    }
  }
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    }
  }
};

// Viewport settings for scroll trigger
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "-50px"
};

// Mobile viewport settings (trigger earlier)
export const mobileViewportSettings = {
  once: true,
  amount: 0.1,
  margin: "-30px"
};

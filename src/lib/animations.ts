import { Variants } from "framer-motion";

// Cinematic easing curve - heavy, expensive, smooth
export const cinematicEase = [0.2, 0.8, 0.2, 1] as const;

// Standard fade up animation - The primary movement
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
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
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
};

// Stagger item for children
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Card item animation
export const cardItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
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
      staggerChildren: 0.1,
      delayChildren: 0.15,
    }
  }
};

// Icon item animation
export const iconItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
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

// Viewport settings for scroll trigger - trigger earlier for smoother experience
export const viewportSettings = {
  once: true,
  amount: 0.05,
  margin: "0px"
};

// Mobile viewport settings (trigger even earlier)
export const mobileViewportSettings = {
  once: true,
  amount: 0.02,
  margin: "50px"
};

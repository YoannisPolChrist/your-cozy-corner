import { Variants } from "framer-motion";

// Performance-optimized easing - GPU-friendly
export const cinematicEase = [0.25, 0.1, 0.25, 1] as const;

// Standard fade up animation - The primary movement
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: cinematicEase,
    }
  }
};

// Mobile-optimized fade up (reduced y distance)
export const fadeUpMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cinematicEase,
    }
  }
};

// Gold frame parallax - delayed slide out effect
export const goldFrameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -15,
    y: -15,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.15,
      ease: cinematicEase,
    }
  }
};

// Image fade in (slightly faster than gold frame)
export const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.99
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
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
      staggerChildren: 0.06,
      delayChildren: 0.02,
    }
  }
};

// Stagger item for children
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
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
      staggerChildren: 0.07,
      delayChildren: 0.03,
    }
  }
};

// Card item animation
export const cardItem: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: cinematicEase,
    }
  }
};

// Subtle scale for hover effects
export const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.25, ease: "easeOut" }
};

// Icon stagger animation
export const iconStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    }
  }
};

// Icon item animation
export const iconItem: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: cinematicEase,
    }
  }
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cinematicEase,
    }
  }
};

// Viewport settings for scroll trigger - trigger earlier for smoother experience
export const viewportSettings = {
  once: true,
  amount: 0.02 as const,
  margin: "-50px" as const
};

// Mobile viewport settings (trigger even earlier)
export const mobileViewportSettings = {
  once: true,
  amount: 0.01 as const,
  margin: "-80px" as const
};

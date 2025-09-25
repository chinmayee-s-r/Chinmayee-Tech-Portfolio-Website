// Animation utilities for consistent animations across components

// Common animation variants for consistent animations across components
export const animationVariants: Record<string, any> = {
  // Hover animations
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  
  // Tap animations
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  
  // Fade in animations
  fadeIn: {
    opacity: [0, 1],
    transition: { duration: 0.5 }
  },
  
  // Slide up animations
  slideUp: {
    y: [20, 0],
    opacity: [0, 1],
    transition: { duration: 0.3 }
  },
  
  // Slide down animations
  slideDown: {
    y: [-20, 0],
    opacity: [0, 1],
    transition: { duration: 0.3 }
  },
  
  // Scale in animations
  scaleIn: {
    scale: [0.8, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 }
  },
  
  // Stagger children animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  // Individual stagger item
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

// Common transition configurations
export const transitions: Record<string, any> = {
  smooth: { duration: 0.3, ease: "easeInOut" },
  quick: { duration: 0.2, ease: "easeOut" },
  slow: { duration: 0.5, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 500, damping: 30 },
  bounce: { type: "spring", stiffness: 400, damping: 10 }
};

// Common animation delays for staggered effects
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
  extraLong: 0.5
};

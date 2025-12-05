// Animation variants and utilities for Framer Motion
// Respects prefers-reduced-motion automatically via Framer Motion

import type { Transition, Variants, Easing } from "framer-motion"

// Smooth ease for transitions - using proper tuple type
export const smoothEase: Easing = [0.25, 0.46, 0.45, 0.94]

// Default transition config
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: smoothEase,
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, y: -20 },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, y: 20 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, x: 50 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: { opacity: 0, x: -50 },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: { opacity: 0 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: { opacity: 0, scale: 0.95 },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
}

// Spring config for snappy animations
export const springConfig: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
}

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
}

// Hover scale animation
export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
}

export const tapScale = {
  scale: 0.98,
}

// Viewport options for scroll animations
export const viewportOnce = {
  once: true,
  amount: 0.3,
}

export const viewportAlways = {
  once: false,
  amount: 0.3,
}

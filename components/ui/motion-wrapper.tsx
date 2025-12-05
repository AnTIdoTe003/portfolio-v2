"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
}

// Wrapper that respects reduced motion preferences
export function MotionWrapper({
  children,
  variants,
  delay = 0,
  className,
  ...props
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion()

  // If user prefers reduced motion, render static content
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Section wrapper for scroll-triggered animations
export function MotionSection({
  children,
  variants,
  delay = 0,
  className,
  ...props
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <section className={className}>{children}</section>
  }

  return (
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

// Stagger container for child animations
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  ...props
}: MotionWrapperProps & { staggerDelay?: number; delayChildren?: number }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item
export function StaggerItem({
  children,
  className,
  ...props
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}


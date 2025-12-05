"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { HeroOrb } from "@/components/three"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { smoothEase } from "@/lib/motion"

const techStack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-background pt-32 pb-20 flex items-center justify-center"
      aria-label="Hero introduction"
    >
      {/* 3D Background */}
      <HeroOrb />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-accent/10 blur-3xl opacity-30" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Tagline */}
        <motion.div className="mb-6 inline-block" variants={itemVariants}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
            ✨ Welcome to my digital space
          </span>
        </motion.div>

        {/* Main Heading - H1 for SEO */}
        <motion.h1
          className="mb-6 text-5xl md:text-7xl font-bold text-balance text-foreground"
          variants={itemVariants}
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Debmalya
          </span>
        </motion.h1>

        {/* Subheading - H2 for hierarchy */}
        <motion.h2
          className="mb-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance font-normal"
          variants={itemVariants}
        >
          Frontend & Full Stack Engineer at{" "}
          <span className="font-semibold text-foreground">SaffronStays</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mb-12 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          I craft performant, beautiful web experiences that seamlessly blend
          thoughtful design with robust engineering. Specializing in React,
          Next.js, and TypeScript.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <MagneticButton strength={0.2}>
            <motion.a
              href="#projects"
              className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              aria-label="View my projects"
            >
              View My Work
            </motion.a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <motion.a
              href="#contact"
              className="inline-block px-8 py-4 rounded-lg border border-primary/30 text-foreground font-semibold transition-all duration-300 hover:bg-primary/10"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              aria-label="Get in touch with me"
            >
              Get In Touch
            </motion.a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <motion.a
              href="https://debmalya-portfolio.vercel.app/resume.pdf"
              className="inline-block px-8 py-4 rounded-lg border border-border text-foreground font-semibold transition-all duration-300 hover:bg-card"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              aria-label="Download my resume"
            >
              Download Resume
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Tech Stack Preview */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center text-sm text-muted-foreground"
          variants={itemVariants}
          aria-label="Technologies I work with"
        >
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-3 py-1 rounded-full bg-card border border-border"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.8 + index * 0.1,
                duration: 0.4,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="text-muted-foreground" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}

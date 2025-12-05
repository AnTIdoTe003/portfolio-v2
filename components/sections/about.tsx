"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { smoothEase } from "@/lib/motion"

const timeline = [
  {
    title: "Education",
    items: [
      { label: "B.Tech in Electronics and Communication Engineering", value: "2019 - 2024" },
    ],
  },
  {
    title: "Core Skills",
    items: [
      { label: "Frontend Architecture", value: "2+ years" },
      { label: "Full Stack Development", value: "2+ years" },
      { label: "Performance Optimization", value: "1+ years" },
    ],
  },
]

export function About() {
  const shouldReduceMotion = useReducedMotion()

  const leftVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  }

  const rightVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  }

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={leftVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate frontend and full-stack engineer with a keen
                eye for building digital experiences that are both beautiful and
                performant. With over 5 years of experience, I've worked on
                diverse projects ranging from dynamic web applications to
                complex SaaS platforms.
              </p>
              <p>
                Currently, I'm working as an SDE-1 at SaffronStays, where I lead
                frontend initiatives and contribute to architectural decisions
                that impact millions of users. My expertise spans modern React
                patterns, server-side rendering, and performance optimization.
              </p>
              <p>
                When I'm not coding, you'll find me diving into system design
                problems, contributing to open source, or exploring the
                intersection of design and engineering. I'm passionate about
                mentoring junior developers and sharing knowledge with the
                community.
              </p>
            </div>
          </motion.div>

          {/* Right - Timeline */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {timeline.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="border-l-2 border-primary/30 pl-6"
                variants={rightVariants}
                custom={sectionIndex}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <div className="space-y-3" role="list">
                  {section.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex justify-between text-sm"
                      role="listitem"
                      initial={
                        shouldReduceMotion ? {} : { opacity: 0, x: 20 }
                      }
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: shouldReduceMotion
                          ? 0
                          : sectionIndex * 0.2 + idx * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <span className="text-foreground">{item.label}</span>
                      <span className="text-accent font-semibold">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

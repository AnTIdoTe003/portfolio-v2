"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { smoothEase } from "@/lib/motion"

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 75 },
      { name: "Git", level: 95 },
      { name: "AWS", level: 80 },
      { name: "CI/CD", level: 85 },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Performance Optimization", level: 90 },
      { name: "System Design", level: 85 },
      { name: "Problem Solving", level: 95 },
      { name: "Team Leadership", level: 80 },
      { name: "Mentoring", level: 85 },
    ],
  },
]

export function Skills() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  }

  const headingVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  }

  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 bg-card"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headingVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground mb-16">
            A comprehensive overview of my technical skills and proficiency
            levels.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, categoryIdx) => (
            <motion.div
              key={categoryIdx}
              variants={itemVariants}
              role="region"
              aria-labelledby={`skill-category-${categoryIdx}`}
            >
              <h3
                id={`skill-category-${categoryIdx}`}
                className="text-2xl font-bold text-foreground mb-8 pb-4 border-b border-primary/20"
              >
                {category.category}
              </h3>
              <div className="space-y-6" role="list">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    role="listitem"
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: shouldReduceMotion
                        ? 0
                        : categoryIdx * 0.1 + skillIdx * 0.05,
                      duration: 0.4,
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span
                        className="text-sm text-accent"
                        aria-label={`${skill.level} percent proficiency`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full bg-muted overflow-hidden"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={shouldReduceMotion ? { width: `${skill.level}%` } : { width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: shouldReduceMotion
                            ? 0
                            : categoryIdx * 0.15 + skillIdx * 0.08,
                          duration: shouldReduceMotion ? 0 : 0.8,
                          ease: smoothEase,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

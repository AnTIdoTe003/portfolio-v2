"use client"

import type React from "react"
import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Mail, Linkedin, Github } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { smoothEase } from "@/lib/motion"

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:viperbale.db@gmail.com",
    label: "Email",
    username: "viperbale.db@gmail.com",
  },
  {
    icon: Github,
    href: "https://github.com/AnTIdoTe003",
    label: "GitHub",
    username: "@AnTIdoTe003",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/debmalya-biswas-340655209/",
    label: "LinkedIn",
    username: "Debmalya Biswas",
  },
]

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - in production, integrate with email service
    setSubmitted(true)
    setTimeout(() => {
      setFormState({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: smoothEase },
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
      id="contact"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={headingVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and
            opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left - Contact Info */}
          <motion.div className="md:col-span-1 order-2 md:order-1" variants={itemVariants}>
            <nav className="space-y-4" aria-label="Social links">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <MagneticButton key={link.label} strength={0.15}>
                    <motion.a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-card"
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: 0.4 }}
                      whileHover={shouldReduceMotion ? {} : { x: 4 }}
                      aria-label={`Contact via ${link.label}: ${link.username}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </motion.div>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors block">
                          {link.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {link.username}
                        </span>
                      </div>
                    </motion.a>
                  </MagneticButton>
                )
              })}
            </nav>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div className="md:col-span-2 order-1 md:order-2" variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-card p-4 sm:p-6 md:p-8 rounded-lg border border-border"
              aria-label="Contact form"
            >
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.1, duration: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Your Name
                </label>
                <motion.input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="John Doe"
                  whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
                />
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Email Address
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                  whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
                />
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Tell me about your project..."
                  whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
                />
              </motion.div>

              {submitted ? (
                <motion.div
                  className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary font-semibold text-center"
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="alert"
                  aria-live="polite"
                >
                  Thank you! I'll get back to you soon.
                </motion.div>
              ) : (
                <MagneticButton strength={0.1} className="w-full">
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300"
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.4)",
                            y: -2,
                          }
                    }
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </MagneticButton>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* Availability */}
        <motion.div
          className="text-center p-8 rounded-lg border border-primary/30 bg-primary/5"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: 0.5 }}
          role="status"
          aria-label="Availability status"
        >
          <p className="text-foreground">
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-accent mr-2"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
            Currently open for freelance projects and full-time opportunities
          </p>
        </motion.div>
      </div>
    </section>
  )
}

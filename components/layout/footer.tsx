"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"

const socialLinks = [
  { icon: Github, href: "https://github.com/AnTIdoTe003", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/debmalya-biswas-340655209", label: "LinkedIn" },
  { icon: Mail, href: "mailto:viperbale.db@gmail.com", label: "Email" },
]

export function Footer() {
  const shouldReduceMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer
      className="bg-card border-t border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Debmalya Biswas
            </h2>
            <p className="text-muted-foreground text-sm">
              Frontend & Full Stack Engineer
            </p>
          </motion.div>

          <motion.nav
            className="flex gap-6"
            variants={itemVariants}
            aria-label="Social media links"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <MagneticButton key={link.label} strength={0.2}>
                  <motion.a
                    href={link.href}
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.2, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.a>
                </MagneticButton>
              )
            })}
          </motion.nav>
        </motion.div>

        <motion.div
          className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground"
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="flex items-center gap-1">
            &copy; {currentYear} Debmalya Biswas. Made with{" "}
            <motion.span
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              aria-label="love"
            >
              <Heart size={12} className="text-red-500 fill-red-500" aria-hidden="true" />
            </motion.span>{" "}
            in India
          </p>
          <nav className="flex gap-6" aria-label="Legal links">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </motion.div>
      </div>
    </footer>
  )
}

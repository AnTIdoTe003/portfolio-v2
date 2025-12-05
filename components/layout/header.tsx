"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const headerVariants = {
    transparent: {
      backgroundColor: "rgba(10, 10, 10, 0)",
      backdropFilter: "blur(0px)",
      borderBottomColor: "rgba(255, 255, 255, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(10, 10, 10, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b"
      initial="transparent"
      animate={isScrolled ? "scrolled" : "transparent"}
      variants={headerVariants}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
      role="banner"
    >
      <nav
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <MagneticButton strength={0.2}>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
              aria-label="Debmalya Biswas - Home"
            >
              <Image
                src="https://ik.imagekit.io/5tgxhsqev/saffronstays-media/image/upload/docs/1764970910831204377"
                alt="DB Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
                unoptimized
              />
            </Link>
          </motion.div>
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8" role="menubar">
          {navItems.map((item, index) => (
            <MagneticButton key={item.href} strength={0.15}>
              <motion.a
                href={item.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none focus-visible:text-foreground py-1"
                role="menuitem"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  duration: 0.3,
                }}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={shouldReduceMotion ? {} : { width: "100%" }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
              </motion.a>
            </MagneticButton>
          ))}
        </div>

        {/* Mobile Navigation Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors p-2 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

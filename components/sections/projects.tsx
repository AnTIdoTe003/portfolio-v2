"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { smoothEase } from "@/lib/motion"

const projects = [
  {
    title: "Coinhub",
    description:
      "A React based Web App where you can see the live price of various cryptos and also the previous trend of the price of that specific Crypto built using ReactJs, ChakraUI, CoinGecko API, and FramerMotion.",
    tech: ["React", "ChakraUI", "CoinGecko API", "FramerMotion"],
    metrics: "Real-time Crypto Tracking",
    image: "/real-time-analytics-dashboard-charts-graphs.jpg", // Placeholder - replace with actual image
    links: {
      live: "https://coinhub-db.vercel.app/",
      github: "https://github.com/AnTIdoTe003/coinhub",
    },
    featured: true,
  },
  {
    title: "theEngineerGuy",
    description:
      "A Blogging Website where you can post your own blog, edit and delete and view other user's blog. A custom Dashboard(CMS) has been made for all the users. Built using NextJs, TypeScript, MongoDB for database, Next-Auth for authentication with Custom Credentials Provider and Google Auth.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Next-Auth", "SCSS", "REST API"],
    metrics: "Full-featured Blogging Platform",
    image: "/ai-content-generation-interface.jpg", // Placeholder - replace with actual image
    links: {
      live: "https://theengineerguy.vercel.app/",
      github: "https://github.com/AnTIdoTe003/blogging-website",
    },
    featured: true,
  },
  {
    title: "Apna Dukan",
    description:
      "A full-stack e-commerce web application made using the MERN Stack. Features include User Registration and Authentication, Filters, Functional Search Bar, Cart, Wishlist, Payment Gateway(RazorPay), User Dashboard, Admin Dashboard, Protected Routes. Admin can create, update, remove products or categories and update delivery status. Users can easily update their profile.",
    tech: ["React", "MongoDB", "Node.js", "Express", "RazorPay"],
    metrics: "Full-stack E-commerce Solution",
    image: "/ecommerce-store-product-catalog.jpg", // Placeholder - replace with actual image
    links: {
      live: "https://apnadukan.vercel.app/",
      github: "https://github.com/AnTIdoTe003/ApnaDukan-Frontend",
    },
    featured: true,
  },
]

export function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

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
      id="projects"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headingVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-16">
            Showcasing some of my best work across web development, full-stack
            applications, and modern technologies.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          role="list"
          aria-label="Featured projects"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featured.map((project, idx) => (
            <motion.article
              key={idx}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
              role="listitem"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      borderColor: "rgba(139, 92, 246, 0.5)",
                      boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.2)",
                      y: -4,
                    }
              }
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`https://www.debmalya.in/${project.image}`}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  quality={85}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <p className="text-accent font-semibold text-sm mb-4">
                  {project.metrics}
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-2 mb-6"
                  aria-label="Technologies used"
                >
                  {project.tech.map((tech, tIdx) => (
                    <motion.span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-foreground font-medium"
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { backgroundColor: "rgba(139, 92, 246, 0.2)" }
                      }
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <MagneticButton strength={0.15}>
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-colors"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      Live Demo
                    </motion.a>
                  </MagneticButton>
                  <MagneticButton strength={0.15}>
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-semibold text-sm transition-colors hover:bg-card"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github size={16} aria-hidden="true" />
                      Code
                    </motion.a>
                  </MagneticButton>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Note: All projects are featured, so no "Other Notable Projects" section needed */}
      </div>
    </section>
  )
}

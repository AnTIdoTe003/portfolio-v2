"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { smoothEase } from "@/lib/motion"

const experiences = [
  {
    role: "SDE-1",
    company: "SaffronStays",
    duration: "July 2024 - Present",
    description:
      "Full-stack development focusing on security deposit management, review platforms, API migrations, and performance optimization.",
    highlights: [
      "Developed a streamlined process for security deposit management, ensuring efficient application review, approval notification, and deposit collection.",
      "Developed a post-booking review platform to analyze user sentiment, enhancing customer insights and supporting data-driven decision-making.",
      "Migrated multiple APIs from Node.js to Go, improving performance, scalability, and maintainability.",
      "Optimized the entire codebase by upgrading to the latest dependencies, resulting in enhanced efficiency and reduced technical debt.",
      "Developed and implemented a hotel search filter with a comprehensive list of add-ons, enabling users to personalize their bookings and increasing average booking value by 25%.",
      "Innovatively designed and implemented a ticketing system module, enhancing issue resolution efficiency and overall customer support capabilities.",
      "Successfully resolved challenges in the invoice API integration, ensuring seamless financial transactions and contributing to enhanced operational efficiency.",
      "Proactively identified and addressed multiple bugs, leveraging a keen eye for detail and enhancing user experience by implementing fresh UI designs from Figma.",
      "Played a pivotal role in developing the Web-Checkin feature, contributing to streamlined hotel check-in processes and improved customer satisfaction.",
      "Demonstrated expertise in backend development by crafting APIs using GoLang, showcasing a commitment to leveraging cutting-edge technologies for optimal system performance.",
      "Revitalized the home page with an innovative search flow, improving user engagement and conversion rates.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "SaffronStays",
    duration: "March 2023 - June 2024",
    description:
      "Frontend development and feature implementation focusing on user experience improvements and booking system enhancements.",
    highlights: [
      "Developed and implemented a hotel search filter with a comprehensive list of add-ons, enabling users to personalize their bookings and increasing average booking value by 25%.",
      "Innovatively designed and implemented a ticketing system module, enhancing issue resolution efficiency and overall customer support capabilities.",
      "Successfully resolved challenges in the invoice API integration, ensuring seamless financial transactions and contributing to enhanced operational efficiency.",
      "Proactively identified and addressed multiple bugs, leveraging a keen eye for detail and enhancing user experience by implementing fresh UI designs from Figma.",
      "Played a pivotal role in developing the Web-Checkin feature, contributing to streamlined hotel check-in processes and improved customer satisfaction.",
      "Demonstrated expertise in backend development by crafting APIs using GoLang, showcasing a commitment to leveraging cutting-edge technologies for optimal system performance.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "CrazeBazaar",
    duration: "September 2023 - July 2024",
    description:
      "Full-stack development on e-commerce platforms and government budget systems.",
    highlights: [
      "Developed a comprehensive e-commerce platform from inception to completion.",
      "Effectively addressed and resolved multiple bugs within a Government budget system, showcasing proficiency in problem-solving and technical expertise.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "MadAlgos",
    duration: "September 2023 - October 2023",
    description:
      "UI/UX development and bug fixes for mentor profile and listing pages.",
    highlights: [
      "Created fresh new UI for mentor profile page.",
      "Created fresh new UI for mentor listing page.",
      "Fixed several UI related bugs.",
    ],
  },
  {
    role: "Technical Content Writer Intern",
    company: "MyWays",
    duration: "April 2022 - January 2023",
    description:
      "Technical content creation and SEO-optimized blog writing on various technical topics and roadmaps.",
    highlights: [
      "Written blogs on various technical topics and roadmaps which are in the top 5 Google search results.",
    ],
  },
]

export function Experience() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
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
      id="experience"
      className="relative py-20 md:py-32 bg-card"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="experience-heading"
          className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-balance"
          variants={headingVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="space-y-12"
          role="list"
          aria-label="Work experience timeline"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experiences.map((exp, idx) => (
            <motion.article
              key={idx}
              className="group relative pl-6 md:pl-8 border-l-2 border-primary/20 hover:border-primary/50 transition-colors duration-300"
              variants={itemVariants}
              role="listitem"
              aria-label={`${exp.role} at ${exp.company}`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-3 md:-left-4 top-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-background border-2 border-primary/50 group-hover:border-primary transition-colors duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                aria-hidden="true"
              />

              {/* Content */}
              <motion.div
                className="bg-background rounded-lg p-4 md:p-6 transition-all duration-300"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        boxShadow:
                          "0 10px 40px -10px rgba(139, 92, 246, 0.15)",
                        y: -2,
                      }
                }
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {exp.duration}
                  </time>
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <ul className="space-y-2" aria-label="Key achievements">
                  {exp.highlights.map((highlight, hIdx) => (
                    <motion.li
                      key={hIdx}
                      className="text-sm text-muted-foreground flex gap-3"
                      initial={
                        shouldReduceMotion ? {} : { opacity: 0, x: 10 }
                      }
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : idx * 0.1 + hIdx * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <span
                        className="text-primary font-bold flex-shrink-0"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

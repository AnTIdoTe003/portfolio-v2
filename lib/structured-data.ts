// Comprehensive JSON-LD Structured Data for SEO
import { siteConfig, projectsData, faqData } from "./seo-config"

// Person Schema - Main identity
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  givenName: "Debmalya",
  familyName: "Biswas",
  url: siteConfig.url,
  image: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/og-image.png`,
    width: 1200,
    height: 630,
  },
  email: `mailto:${siteConfig.email}`,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.links),
  worksFor: {
    "@type": "Organization",
    name: siteConfig.company,
    url: siteConfig.companyUrl,
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University", // Update with actual university
  },
  knowsAbout: siteConfig.skills,
  nationality: {
    "@type": "Country",
    name: "India",
  },
}

// WebSite Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.title,
  description: siteConfig.description,
  publisher: {
    "@id": `${siteConfig.url}/#person`,
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

// WebPage Schema for the main page
export const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/#webpage`,
  url: siteConfig.url,
  name: siteConfig.title,
  description: siteConfig.description,
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#person`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/og-image.png`,
  },
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
}

// ProfilePage Schema (for portfolio/about pages)
export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profilepage`,
  url: siteConfig.url,
  name: `${siteConfig.name} - Portfolio`,
  mainEntity: {
    "@id": `${siteConfig.url}/#person`,
  },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
}

// ItemList Schema for Projects
export const projectsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/#projects`,
  name: "Featured Projects",
  description: "Portfolio projects showcasing web development expertise",
  numberOfItems: projectsData.length,
  itemListElement: projectsData.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      description: project.description,
      url: project.url,
      image: `${siteConfig.url}${project.image}`,
      datePublished: project.datePublished,
      author: {
        "@id": `${siteConfig.url}/#person`,
      },
      keywords: project.technologies.join(", "),
    },
  })),
}

// FAQ Schema
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

// BreadcrumbList Schema
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
  ],
}

// Organization Schema (for the company you work for - optional)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.companyUrl}/#organization`,
  name: siteConfig.company,
  url: siteConfig.companyUrl,
  employee: {
    "@id": `${siteConfig.url}/#person`,
  },
}

// Service Schema (if offering freelance services)
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/#service`,
  name: "Web Development Services",
  description:
    "Professional frontend and full-stack web development services specializing in React, Next.js, and TypeScript.",
  provider: {
    "@id": `${siteConfig.url}/#person`,
  },
  serviceType: "Web Development",
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Frontend Development",
          description:
            "Modern, responsive frontend development using React and Next.js",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Stack Development",
          description:
            "End-to-end web application development with Node.js backend",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Optimization",
          description:
            "Web performance audits and optimization for better user experience",
        },
      },
    ],
  },
}

// Combined schema for the main page
export const combinedSchema = [
  personSchema,
  websiteSchema,
  webPageSchema,
  profilePageSchema,
  projectsListSchema,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
]

// Helper function to generate schema script tag content
export function generateSchemaScript(): string {
  return JSON.stringify(combinedSchema)
}


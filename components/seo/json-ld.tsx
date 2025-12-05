// Server Component for JSON-LD Structured Data
// This can be used to add page-specific structured data

import { siteConfig } from "@/lib/seo-config"

// Generate Article Schema (for blog posts if added later)
export function generateArticleSchema(article: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${siteConfig.url}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
  }
}

// Generate Software/Project Schema
export function generateProjectSchema(project: {
  name: string
  description: string
  url: string
  image: string
  technologies: string[]
  datePublished: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image.startsWith("http")
      ? project.image
      : `${siteConfig.url}${project.image}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    datePublished: project.datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

// Generate Review Schema (for testimonials if added)
export function generateReviewSchema(review: {
  author: string
  reviewBody: string
  rating: number
  datePublished: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
    },
    datePublished: review.datePublished,
    itemReviewed: {
      "@type": "Service",
      name: "Web Development Services",
      provider: {
        "@type": "Person",
        name: siteConfig.name,
      },
    },
  }
}

// Generate HowTo Schema (for tutorials if added)
export function generateHowToSchema(howTo: {
  name: string
  description: string
  steps: { name: string; text: string; image?: string }[]
  totalTime?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  }
}

// Generate Event Schema (for webinars/talks if added)
export function generateEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate: string
  location?: string
  url?: string
  isOnline?: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: event.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: event.isOnline
      ? {
          "@type": "VirtualLocation",
          url: event.url,
        }
      : {
          "@type": "Place",
          name: event.location,
        },
    organizer: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

// Component to render JSON-LD script
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

// Pre-built schemas for common use cases
export const schemas = {
  // Local Business Schema (if applicable)
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - Web Development`,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "", // Add if needed
      longitude: "", // Add if needed
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(siteConfig.links),
  },

  // Contact Page Schema
  contactPage: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Debmalya Biswas",
    description: "Get in touch for web development projects and opportunities",
    url: `${siteConfig.url}/#contact`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      email: siteConfig.email,
      url: siteConfig.url,
    },
  },

  // About Page Schema
  aboutPage: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name}, a ${siteConfig.jobTitle}`,
    url: `${siteConfig.url}/#about`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.jobTitle,
      description: siteConfig.description,
    },
  },
}


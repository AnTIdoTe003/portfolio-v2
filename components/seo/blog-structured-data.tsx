import type { BlogPost } from "@/lib/blog-data"
import { siteConfig } from "@/lib/seo-config"

interface BlogStructuredDataProps {
  post: BlogPost
}

export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteConfig.url}${post.image}` : siteConfig.ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
      jobTitle: "Frontend Developer",
      description: "Frontend SDE specializing in React, Next.js, and modern web development",
    },
    publisher: {
      "@type": "Organization",
      name: post.author,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: post.readTime,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BlogListStructuredData({ posts }: { posts: BlogPost[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: `Technical blog by ${siteConfig.name}, frontend developer and SDE`,
    url: `${siteConfig.url}/blog`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: siteConfig.jobTitle,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
      keywords: post.keywords.join(", "),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}


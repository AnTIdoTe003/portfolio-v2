import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/lib/seo-config"
import { generateSchemaScript } from "@/lib/structured-data"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

// Comprehensive SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // Basic SEO
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,

  // Author info
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.jobTitle}`,
        type: "image/png",
      },
      {
        url: siteConfig.ogImage,
        width: 600,
        height: 315,
        alt: `${siteConfig.name} - ${siteConfig.jobTitle}`,
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@debmalya",
    creator: "@debmalya",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: {
      url: siteConfig.ogImage,
      alt: `${siteConfig.name} - ${siteConfig.jobTitle}`,
    },
  },

  // Icons - Next.js 13+ will automatically use app/icon.tsx and app/apple-icon.tsx
  // The dynamic icon.tsx serves as /icon and /favicon.ico automatically
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon",
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#8b5cf6",
      },
    ],
  },

  // Manifest
  manifest: "/manifest.json",

  // Alternates
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
    },
  },

  // Category
  category: "technology",

  // App links (for mobile)
  appLinks: {
    web: {
      url: siteConfig.url,
      should_fallback: true,
    },
  },

  // Verification tokens (uncomment and add your tokens)
  // verification: {
  //   google: siteConfig.verification.google,
  //   yandex: siteConfig.verification.yandex,
  //   other: {
  //     "msvalidate.01": siteConfig.verification.bing,
  //     "p:domain_verify": siteConfig.verification.pinterest,
  //   },
  // },

  // Other metadata
  other: {
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.name,
    "application-name": siteConfig.name,
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
    // Geo tags
    "geo.region": "IN",
    "geo.placename": "India",
    // Content info
    "content-language": "en",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
  },
}

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for analytics and CDNs */}
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/og-image.png"
          as="image"
          type="image/png"
        />

        {/* Favicon links - explicit for better browser support */}
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon" type="image/png" sizes="16x16" />
        <link rel="shortcut icon" href="/icon" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />

        {/* Explicit meta description for SEO tools */}
        <meta name="description" content={siteConfig.description} />

        {/* Additional meta tags */}
        <meta name="author" content={siteConfig.name} />
        <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteConfig.name}`} />
        <meta name="subject" content="Portfolio Website" />
        <meta name="url" content={siteConfig.url} />
        <meta name="identifier-URL" content={siteConfig.url} />
        <meta name="coverage" content="Worldwide" />

        {/* Dublin Core Metadata */}
        <meta name="DC.title" content={siteConfig.title} />
        <meta name="DC.creator" content={siteConfig.name} />
        <meta name="DC.subject" content="Web Development, Portfolio" />
        <meta name="DC.description" content={siteConfig.description} />
        <meta name="DC.publisher" content={siteConfig.name} />
        <meta name="DC.type" content="Text" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content={siteConfig.url} />
        <meta name="DC.language" content="en" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateSchemaScript() }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        >
          Skip to main content
        </a>

        {children}

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}

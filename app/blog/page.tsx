import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts, getAllTags } from "@/lib/blog-data"
import { Calendar, Clock, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogListStructuredData } from "@/components/seo/blog-structured-data"

export const metadata: Metadata = {
  title: "Blog - Debmalya Biswas | Frontend Developer Insights",
  description: "Read technical blog posts by Debmalya Biswas, a frontend SDE. Learn about React, Next.js, TypeScript, web performance, and modern frontend development.",
  keywords: [
    "Debmalya Biswas",
    "Debmalya Biswas blog",
    "Debmalya frontend",
    "Debmalya SDE",
    "Debmalya Biswas portfolio",
    "frontend development blog",
    "React tutorials",
    "Next.js guide",
    "TypeScript tips",
    "web performance",
  ],
  openGraph: {
    title: "Blog - Debmalya Biswas | Frontend Developer",
    description: "Technical insights on React, Next.js, and modern web development by Debmalya Biswas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Debmalya Biswas",
    description: "Frontend development insights and tutorials",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <>
      <BlogListStructuredData posts={posts} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
          <Link
            href="/"
            className="inline-block text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog by Debmalya Biswas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thoughts and insights on frontend development, React, Next.js, TypeScript, and building modern web applications.
            Written by <strong>Debmalya Biswas</strong>, frontend SDE.
          </p>
        </div>
      </header>

      {/* Tags */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Topics:</span>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer">
                {/* Image */}
                {post.image && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Author Section */}
        <section className="mt-16 border-t pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">About the Author</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Debmalya Biswas</strong> is a passionate frontend developer and software development engineer (SDE)
              specializing in React, Next.js, TypeScript, and modern web technologies. With extensive experience building
              performant, accessible web applications, Debmalya focuses on creating exceptional user experiences and sharing
              knowledge with the developer community.
            </p>
            <p className="text-muted-foreground">
              Explore the <Link href="/" className="text-primary hover:underline">Debmalya Biswas portfolio</Link> to
              see projects and get in touch.
            </p>
          </div>
        </section>
      </main>
      </div>
    </>
  )
}

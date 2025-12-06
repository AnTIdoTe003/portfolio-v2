import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts, getPostBySlug } from "@/lib/blog-data"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BlogStructuredData } from "@/components/seo/blog-structured-data"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Convert markdown-like content to JSX (simplified version)
  // In production, you'd use a proper markdown parser like remark/rehype
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: React.ReactElement[] = []
    let currentCodeBlock: string[] = []
    let inCodeBlock = false
    let codeLanguage = ''

    // Helper to escape HTML characters to prevent XSS
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }

    lines.forEach((line, index) => {
      // Check for code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.replace('```', '').trim()
        } else {
          // End code block
          elements.push(
            <pre key={`code-${index}`} className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
              <code className={`language-${codeLanguage} text-sm`}>
                {currentCodeBlock.join('\n')}
              </code>
            </pre>
          )
          currentCodeBlock = []
          inCodeBlock = false
          codeLanguage = ''
        }
      } else if (inCodeBlock) {
        currentCodeBlock.push(line)
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-4xl font-bold mt-8 mb-4">
            {escapeHtml(line.replace('# ', ''))}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-3xl font-bold mt-8 mb-4">
            {escapeHtml(line.replace('## ', ''))}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {escapeHtml(line.replace('### ', ''))}
          </h3>
        )
      } else if (line.startsWith('---')) {
        elements.push(<Separator key={index} className="my-8" />)
      } else if (line.trim() === '') {
        // Skip empty lines
      } else {
        // Regular paragraph with bold markdown support
        // We escape the line first, but we need to handle markdown markers carefully.
        // A simple approach is to escape first, then replace the markdown markers.
        // However, if the markers themselves were escaped, we might break things.
        // But for this simple parser, let's assume markers are not part of user data meant to be escaped in that way.
        // Better yet, we can split by markers, escape the parts, and rejoin.

        // Simplified safe parsing:
        let safeLine = escapeHtml(line)

        // Re-enable bold and code after escaping
        // Note: This is a simplistic approach. Real markdown parsers are much more complex.
        // We are replacing the escaped versions of the markers back to HTML tags,
        // but applying it to the content inside.
        // Actually, regex replace on the original line is risky if we don't escape the content.

        // Let's implement a safer replacement by using a callback
        safeLine = safeLine
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.+?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')

        elements.push(
          <p
            key={index}
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: safeLine }}
          />
        )
      }
    })

    // Render any pending code block if the file ends without closing ```
    if (inCodeBlock && currentCodeBlock.length > 0) {
      elements.push(
        <pre key={`code-end`} className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
          <code className={`language-${codeLanguage} text-sm`}>
            {currentCodeBlock.join('\n')}
          </code>
        </pre>
      )
    }

    return elements
  }

  return (
    <>
      <BlogStructuredData post={post} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  DB
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-foreground">{post.author}</div>
                <div className="text-xs">Frontend SDE</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-8">
          <div className="relative h-96 rounded-xl overflow-hidden bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </article>

      {/* Author Bio */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="border rounded-lg p-6 bg-muted/30">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                DB
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold mb-2">About {post.author}</h3>
              <p className="text-muted-foreground mb-4">
                <strong>Debmalya Biswas</strong> is a passionate frontend developer and software development engineer (SDE)
                specializing in React, Next.js, TypeScript, and modern web technologies. With extensive experience building
                performant, accessible web applications, Debmalya focuses on creating exceptional user experiences.
              </p>
              <Link
                href="/"
                className="text-primary hover:underline font-medium"
              >
                View Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl border-t">
        <h2 className="text-2xl font-bold mb-6">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getAllPosts()
            .filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow h-full group">
                  <div className="flex gap-2 mb-3">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={relatedPost.date}>
                      {new Date(relatedPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
      </div>
    </>
  )
}


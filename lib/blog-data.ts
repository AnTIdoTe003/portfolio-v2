export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
  image?: string
  keywords: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-modern-portfolio-website-nextjs",
    title: "Building a Modern Portfolio Website with Next.js - Debmalya Biswas",
    description: "Learn how Debmalya Biswas built a high-performance portfolio website using Next.js, React, and modern frontend technologies. A complete guide for frontend developers.",
    author: "Debmalya Biswas",
    date: "2024-12-01",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Portfolio", "Frontend Development"],
    image: "/assets/blog/modern-portfolio.svg",
    keywords: ["Debmalya Biswas", "Debmalya Biswas portfolio", "Debmalya Biswas frontend", "portfolio website", "Next.js portfolio"],
    content: `
# Building a Modern Portfolio Website with Next.js

As a frontend developer, creating a standout portfolio is essential. I'm **Debmalya Biswas**, and in this article, I'll share my journey of building a modern, performant portfolio website using Next.js 14 and cutting-edge frontend technologies.

## Why I Chose Next.js

When I started planning my portfolio website, I knew I needed a framework that could deliver exceptional performance while providing great developer experience. Next.js was the perfect choice for several reasons:

### Server-Side Rendering (SSR) for SEO
As **Debmalya Biswas**, a frontend developer focused on creating accessible and discoverable web experiences, SEO was crucial for my portfolio. Next.js's built-in SSR capabilities ensure that search engines can properly crawl and index my content.

### Performance Out of the Box
Next.js provides automatic code splitting, optimized image loading, and excellent caching strategies. These features were essential for creating a fast, responsive portfolio that showcases my frontend development skills.

## Tech Stack Breakdown

Here's the complete tech stack I used for the **Debmalya Biswas portfolio**:

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth, performant animations
- **UI Components**: Radix UI for accessible component primitives
- **3D Graphics**: Three.js with React Three Fiber for interactive elements
- **TypeScript**: Full type safety across the codebase

## Key Features Implemented

### 1. Hero Section with 3D Elements
I implemented an interactive 3D orb using Three.js that responds to mouse movements, creating an engaging first impression.

### 2. Responsive Design
The portfolio is fully responsive, providing an optimal viewing experience across all devices - from mobile phones to large desktop screens.

### 3. Dark Mode Support
Using next-themes, I implemented a seamless dark mode that respects user preferences.

### 4. Performance Optimization
- Image optimization with next/image
- Code splitting and lazy loading
- Efficient font loading with next/font
- Minimal JavaScript bundle size

## SEO Optimization Strategies

As a frontend SDE, I understand the importance of discoverability. Here's how I optimized the **Debmalya Biswas website** for search engines:

1. **Semantic HTML**: Proper use of HTML5 semantic elements
2. **Meta Tags**: Comprehensive Open Graph and Twitter Card metadata
3. **Structured Data**: JSON-LD schema for rich search results
4. **Sitemap**: Automatically generated sitemap for search crawlers
5. **Performance**: Lighthouse score of 95+ for optimal ranking

## Lessons Learned

Building this portfolio taught me valuable lessons about:
- Balancing aesthetics with performance
- Progressive enhancement for better accessibility
- The importance of meaningful animations
- Optimizing for Core Web Vitals

## Conclusion

Creating the **Debmalya Biswas portfolio website** was an enriching experience that allowed me to showcase my frontend development skills while learning advanced Next.js patterns. If you're a fellow SDE or frontend developer looking to build your own portfolio, I highly recommend Next.js as your framework of choice.

The source code is available on my GitHub, and I'm always happy to connect with fellow developers. Feel free to reach out!

---

*About the Author: Debmalya Biswas is a frontend developer specializing in React, Next.js, and modern web technologies. With expertise in building performant, accessible web applications, Debmalya focuses on creating exceptional user experiences.*
    `
  },
  {
    slug: "mastering-react-hooks-frontend-development",
    title: "Mastering React Hooks: Advanced Patterns for Frontend Developers",
    description: "Debmalya Biswas shares advanced React Hooks patterns and best practices for building scalable frontend applications. Essential reading for React developers.",
    author: "Debmalya Biswas",
    date: "2024-11-28",
    readTime: "10 min read",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    image: "/assets/blog/react-hooks.svg",
    keywords: ["Debmalya Biswas", "Debmalya frontend", "React hooks", "frontend development", "Debmalya SDE"],
    content: `
# Mastering React Hooks: Advanced Patterns for Frontend Developers

Hello! I'm **Debmalya Biswas**, a frontend developer passionate about React and modern JavaScript. In this comprehensive guide, I'll share advanced React Hooks patterns that I've learned throughout my journey as an SDE.

## Introduction to React Hooks

React Hooks revolutionized how we write React components. As a frontend developer at **Debmalya Biswas's** projects, I've extensively used Hooks to create maintainable, performant applications.

## Essential Hooks Every Frontend Developer Should Master

### 1. useState - The Foundation

The useState Hook is fundamental, but there's more to it than meets the eye:

\`\`\`typescript
// Basic usage
const [count, setCount] = useState(0)

// Functional updates for complex state logic
const [state, setState] = useState(initialState)
setState(prev => ({ ...prev, newValue }))

// Lazy initialization for expensive computations
const [data, setData] = useState(() => expensiveComputation())
\`\`\`

### 2. useEffect - Handling Side Effects

As an SDE focused on clean code, proper useEffect usage is crucial:

\`\`\`typescript
useEffect(() => {
  // Effect logic
  const subscription = subscribeToData()

  // Cleanup function
  return () => subscription.unsubscribe()
}, [dependencies])
\`\`\`

### 3. useCallback - Performance Optimization

In my **Debmalya Biswas portfolio**, I use useCallback extensively:

\`\`\`typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b]
)
\`\`\`

### 4. useMemo - Expensive Computations

\`\`\`typescript
const expensiveValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
)
\`\`\`

## Advanced Patterns

### Custom Hooks for Reusability

As **Debmalya Biswas, frontend developer**, I always advocate for code reusability:

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
\`\`\`

### useReducer for Complex State

\`\`\`typescript
type State = { count: number; step: number }
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; step: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'setStep':
      return { ...state, step: action.step }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 })
  // Implementation
}
\`\`\`

## Best Practices from My Experience

As **Debmalya Biswas**, working as a frontend SDE, I've learned these crucial lessons:

### 1. Always Specify Dependencies
Never lie to React about dependencies. Use ESLint's exhaustive-deps rule.

### 2. Separate Concerns
Create custom hooks for distinct pieces of functionality.

### 3. Avoid Premature Optimization
Don't use useMemo/useCallback everywhere. Profile first!

### 4. Keep Hooks at the Top Level
Never call Hooks inside conditions, loops, or nested functions.

## Real-World Example: Data Fetching Hook

Here's a practical custom hook I use in the **Debmalya Biswas website**:

\`\`\`typescript
function useDataFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()

        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}
\`\`\`

## Conclusion

Mastering React Hooks is essential for any modern frontend developer. These patterns have served me well in building the **Debmalya Biswas portfolio** and countless other projects.

Keep learning, keep building!

---

*Debmalya Biswas is a passionate frontend developer and SDE specializing in React, TypeScript, and modern web development. Follow for more insights on frontend development.*
    `
  },
  {
    slug: "nextjs-14-app-router-complete-guide",
    title: "Next.js 14 App Router: Complete Guide by Debmalya Biswas",
    description: "Comprehensive guide to Next.js 14 App Router by frontend developer Debmalya Biswas. Learn server components, routing, and advanced patterns.",
    author: "Debmalya Biswas",
    date: "2024-11-25",
    readTime: "12 min read",
    tags: ["Next.js", "React", "App Router", "Server Components"],
    image: "/assets/blog/nextjs-router.svg",
    keywords: ["Debmalya Biswas", "Next.js tutorial", "Debmalya frontend", "Debmalya Biswas website"],
    content: `
# Next.js 14 App Router: Complete Guide

Welcome! **Debmalya Biswas** here, and today I'm diving deep into Next.js 14's App Router - a revolutionary approach to building React applications.

## Why App Router Matters

As a frontend developer working on the **Debmalya Biswas portfolio** and other production applications, I've witnessed firsthand how the App Router transforms the development experience.

## Understanding the Fundamentals

### Server Components by Default

The biggest shift in Next.js 14 is that all components are Server Components by default:

\`\`\`typescript
// app/page.tsx - Server Component by default
export default async function Page() {
  const data = await fetchData() // Direct async/await!

  return <div>{data.title}</div>
}
\`\`\`

### Client Components When Needed

Use 'use client' directive for interactive components:

\`\`\`typescript
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

## File-Based Routing

The App Router uses a file-system based router. Here's how **Debmalya Biswas's** portfolio is structured:

\`\`\`
app/
├── page.tsx                 # /
├── about/
│   └── page.tsx            # /about
├── blog/
│   ├── page.tsx            # /blog
│   └── [slug]/
│       └── page.tsx        # /blog/[slug]
└── layout.tsx              # Root layout
\`\`\`

## Layouts and Templates

### Root Layout

Every app needs a root layout:

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Nested Layouts

Layouts can be nested for shared UI:

\`\`\`typescript
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <BlogNav />
      {children}
    </div>
  )
}
\`\`\`

## Data Fetching Patterns

### Server-Side Data Fetching

As **Debmalya Biswas, SDE**, I leverage server-side fetching extensively:

\`\`\`typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <main>{/* Render data */}</main>
}
\`\`\`

### Parallel Data Fetching

Optimize performance with parallel fetches:

\`\`\`typescript
async function getUser() {
  return fetch('https://api.example.com/user').then(r => r.json())
}

async function getPosts() {
  return fetch('https://api.example.com/posts').then(r => r.json())
}

export default async function Page() {
  // Fetch in parallel
  const [user, posts] = await Promise.all([getUser(), getPosts()])

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
    </div>
  )
}
\`\`\`

## Route Handlers (API Routes)

Create API endpoints easily:

\`\`\`typescript
// app/api/posts/route.ts
export async function GET(request: Request) {
  const posts = await fetchPosts()
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = await createPost(body)
  return Response.json(post, { status: 201 })
}
\`\`\`

## Dynamic Routes and Params

### Dynamic Segments

\`\`\`typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <article>Post: {params.slug}</article>
}
\`\`\`

### Generating Static Params

For static site generation:

\`\`\`typescript
export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
\`\`\`

## Metadata and SEO

The **Debmalya Biswas website** uses comprehensive metadata:

\`\`\`typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Debmalya Biswas - Frontend Developer',
  description: 'Portfolio and blog of Debmalya Biswas, frontend SDE',
  keywords: ['Debmalya Biswas', 'frontend developer', 'React', 'Next.js'],
  openGraph: {
    title: 'Debmalya Biswas Portfolio',
    description: 'Frontend developer specializing in React and Next.js',
    images: ['/og-image.png'],
  },
}
\`\`\`

### Dynamic Metadata

\`\`\`typescript
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.description,
  }
}
\`\`\`

## Loading States and Streaming

### loading.tsx

\`\`\`typescript
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading blog posts...</div>
}
\`\`\`

### Suspense Boundaries

\`\`\`typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>My Blog</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogPosts />
      </Suspense>
    </div>
  )
}
\`\`\`

## Error Handling

### error.tsx

\`\`\`typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
\`\`\`

## Best Practices I Follow

As **Debmalya Biswas, frontend developer**, here are my recommendations:

1. **Use Server Components by Default**: Only use Client Components when you need interactivity
2. **Collocate Data Fetching**: Fetch data where it's needed
3. **Leverage Parallel Fetching**: Use Promise.all for independent requests
4. **Implement Proper Error Boundaries**: Handle errors gracefully
5. **Optimize Images**: Use next/image for automatic optimization
6. **Add Loading States**: Improve perceived performance

## Conclusion

The Next.js 14 App Router is a game-changer for frontend development. These patterns power the **Debmalya Biswas portfolio** and can help you build better React applications.

Happy coding!

---

*Debmalya Biswas is a frontend SDE passionate about React, Next.js, and modern web development. Connect with me to discuss frontend architecture and best practices.*
    `
  },
  {
    slug: "typescript-best-practices-react-developers",
    title: "TypeScript Best Practices for React Developers - Debmalya Biswas",
    description: "Learn TypeScript best practices for React from Debmalya Biswas, frontend developer. Essential patterns for type-safe React applications.",
    author: "Debmalya Biswas",
    date: "2024-11-22",
    readTime: "9 min read",
    tags: ["TypeScript", "React", "JavaScript", "Best Practices"],
    image: "/assets/blog/typescript-best-practices.svg",
    keywords: ["Debmalya Biswas", "TypeScript React", "Debmalya frontend", "Debmalya SDE"],
    content: `
# TypeScript Best Practices for React Developers

Hi, I'm **Debmalya Biswas**, a frontend developer who's passionate about type safety and developer experience. Today, I'm sharing TypeScript best practices I use in production React applications.

## Why TypeScript?

As **Debmalya Biswas, SDE**, I've found TypeScript invaluable for:
- Catching bugs at compile time
- Improving code documentation
- Enhancing IDE autocomplete
- Facilitating refactoring

## Essential Type Patterns

### Component Props Typing

\`\`\`typescript
// Basic props interface
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
\`\`\`

### Children Props

\`\`\`typescript
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={className}>{children}</div>
}
\`\`\`

### Event Handlers

\`\`\`typescript
interface FormProps {
  onSubmit: (data: FormData) => void
}

function MyForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input change
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Handle button click
  }

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>
}
\`\`\`

## Advanced Patterns

### Generic Components

In the **Debmalya Biswas portfolio**, I use generic components for flexibility:

\`\`\`typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
const users = [{ id: '1', name: 'Debmalya' }]
<List
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id}
/>
\`\`\`

### Discriminated Unions

\`\`\`typescript
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: Error }

function DataDisplay({ state }: { state: LoadingState }) {
  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      return <div>{state.data}</div> // TypeScript knows data exists
    case 'error':
      return <div>Error: {state.error.message}</div>
  }
}
\`\`\`

### Utility Types

\`\`\`typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>

// Omit properties
type UserWithoutPassword = Omit<User, 'password'>

// Partial for optional updates
type UserUpdate = Partial<User>

// Required makes all properties required
type RequiredUser = Required<Partial<User>>

// Record for key-value mappings
type ErrorMessages = Record<string, string>
\`\`\`

## Hooks with TypeScript

### useState

\`\`\`typescript
// Type inference
const [count, setCount] = useState(0) // inferred as number

// Explicit typing
const [user, setUser] = useState<User | null>(null)

// With initial value
const [items, setItems] = useState<Item[]>([])
\`\`\`

### useRef

\`\`\`typescript
// DOM refs
const inputRef = useRef<HTMLInputElement>(null)

// Mutable value refs
const timerRef = useRef<NodeJS.Timeout | null>(null)
\`\`\`

### useReducer

\`\`\`typescript
type State = { count: number }
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; value: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'set':
      return { count: action.value }
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
\`\`\`

### Custom Hooks

As **Debmalya Biswas, frontend developer**, I create typed custom hooks:

\`\`\`typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
\`\`\`

## API Integration

### Typed Fetch Wrapper

\`\`\`typescript
async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Usage
const user = await fetchApi<User>('/api/user')
\`\`\`

### Form Data Handling

\`\`\`typescript
interface LoginForm {
  email: string
  password: string
}

function LoginForm() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })

  const handleChange = (field: keyof LoginForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

  return (
    <form>
      <input value={formData.email} onChange={handleChange('email')} />
      <input value={formData.password} onChange={handleChange('password')} />
    </form>
  )
}
\`\`\`

## Best Practices

### 1. Avoid 'any'

\`\`\`typescript
// Bad
function process(data: any) { }

// Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is string here
  }
}
\`\`\`

### 2. Use Type Inference

\`\`\`typescript
// Let TypeScript infer when obvious
const name = 'Debmalya Biswas' // string inferred

// Specify types when needed
const config: AppConfig = getConfig()
\`\`\`

### 3. Prefer Interfaces for Objects

\`\`\`typescript
// Good for objects
interface User {
  id: string
  name: string
}

// Good for unions/primitives
type ID = string | number
type Status = 'active' | 'inactive'
\`\`\`

### 4. Use Const Assertions

\`\`\`typescript
const routes = {
  home: '/',
  blog: '/blog',
  about: '/about'
} as const

type Route = typeof routes[keyof typeof routes]
\`\`\`

## Conclusion

TypeScript significantly improves React development. These patterns power the **Debmalya Biswas website** and ensure type safety across all components.

Keep coding with confidence!

---

*Debmalya Biswas is a frontend SDE specializing in TypeScript, React, and type-safe web development. Visit the Debmalya Biswas portfolio for more insights.*
    `
  },
  {
    slug: "web-performance-optimization-guide",
    title: "Web Performance Optimization: A Frontend Developer's Guide",
    description: "Debmalya Biswas shares comprehensive web performance optimization techniques for frontend developers. Learn to build lightning-fast websites.",
    author: "Debmalya Biswas",
    date: "2024-11-20",
    readTime: "11 min read",
    tags: ["Performance", "Web Development", "Frontend", "Optimization"],
    image: "/assets/blog/web-performance.svg",
    keywords: ["Debmalya Biswas", "web performance", "Debmalya frontend", "Debmalya Biswas portfolio"],
    content: `
# Web Performance Optimization: A Frontend Developer's Guide

Hello! **Debmalya Biswas** here. As a frontend developer obsessed with performance, I'm sharing battle-tested optimization techniques that power the **Debmalya Biswas website** and other high-traffic applications.

## Why Performance Matters

In my experience as **Debmalya Biswas, SDE**, I've learned that:
- 1 second delay = 7% reduction in conversions
- 53% of mobile users abandon slow sites
- Performance directly impacts SEO rankings

## Core Web Vitals

### Largest Contentful Paint (LCP)

LCP measures loading performance. Target: under 2.5 seconds.

\`\`\`typescript
// Optimize images
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // Preload above-fold images
  alt="Hero image"
/>
\`\`\`

### First Input Delay (FID)

FID measures interactivity. Target: under 100ms.

\`\`\`typescript
// Code splitting to reduce main thread blocking
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
})
\`\`\`

### Cumulative Layout Shift (CLS)

CLS measures visual stability. Target: under 0.1.

\`\`\`typescript
// Always specify image dimensions
<Image
  src="/profile.jpg"
  width={400}
  height={400}
  alt="Profile"
/>

// Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  {loading ? <Skeleton /> : <Content />}
</div>
\`\`\`

## Image Optimization

The **Debmalya Biswas portfolio** uses several image optimization techniques:

### 1. Modern Formats

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
\`\`\`

### 2. Responsive Images

\`\`\`typescript
<Image
  src="/hero.jpg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
  alt="Hero"
/>
\`\`\`

### 3. Lazy Loading

\`\`\`typescript
<Image
  src="/below-fold.jpg"
  width={800}
  height={600}
  loading="lazy"
  alt="Below fold image"
/>
\`\`\`

## Code Splitting

### Dynamic Imports

\`\`\`typescript
import dynamic from 'next/dynamic'

// Component-level splitting
const Chart = dynamic(() => import('./Chart'), {
  ssr: false, // Disable SSR for client-only components
  loading: () => <div>Loading chart...</div>
})

// Named exports
const Dashboard = dynamic(
  () => import('./Dashboard').then(mod => mod.Dashboard)
)
\`\`\`

### Route-Based Splitting

Next.js automatically code-splits by route:

\`\`\`
app/
├── page.tsx        # Separate bundle
├── blog/
│   └── page.tsx    # Separate bundle
└── about/
    └── page.tsx    # Separate bundle
\`\`\`

## Font Optimization

As **Debmalya Biswas, frontend developer**, I optimize fonts carefully:

\`\`\`typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  preload: true,
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## JavaScript Optimization

### Tree Shaking

\`\`\`typescript
// Bad - imports entire library
import _ from 'lodash'

// Good - imports only what's needed
import debounce from 'lodash/debounce'

// Better - use ES modules
import { debounce } from 'lodash-es'
\`\`\`

### Minification

Next.js minifies automatically, but you can optimize further:

\`\`\`javascript
// next.config.js
module.exports = {
  swcMinify: true, // Use SWC minifier for better performance
  // ... other config
}
\`\`\`

## Caching Strategies

### Static Assets

\`\`\`typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
\`\`\`

### API Routes

\`\`\`typescript
export async function GET() {
  const data = await fetchData()

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
\`\`\`

### ISR (Incremental Static Regeneration)

\`\`\`typescript
export const revalidate = 3600 // Revalidate every hour

export default async function Page() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}
\`\`\`

## Network Optimization

### Resource Hints

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.example.com" />
        <link rel="preload" href="/critical.css" as="style" />
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Compression

\`\`\`javascript
// next.config.js
module.exports = {
  compress: true, // Enable gzip compression
}
\`\`\`

## Rendering Strategies

The **Debmalya Biswas website** uses optimal rendering for each page:

### Static Generation (SSG)

\`\`\`typescript
// Best for marketing pages
export default async function HomePage() {
  return <Landing />
}
\`\`\`

### Server-Side Rendering (SSR)

\`\`\`typescript
// For dynamic, personalized content
export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const user = await getUser()
  return <UserDashboard user={user} />
}
\`\`\`

### Client-Side Rendering (CSR)

\`\`\`typescript
'use client'

export function InteractiveChart() {
  const [data, setData] = useState([])
  // Client-side data fetching
}
\`\`\`

## Monitoring Performance

### Web Vitals

\`\`\`typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
\`\`\`

### Custom Metrics

\`\`\`typescript
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric) // Send to analytics
  }
}
\`\`\`

## Performance Checklist

As **Debmalya Biswas, SDE**, I follow this checklist:

- [ ] Optimize images (WebP/AVIF, lazy loading)
- [ ] Enable compression
- [ ] Implement code splitting
- [ ] Optimize fonts
- [ ] Set up caching headers
- [ ] Minimize JavaScript
- [ ] Use resource hints
- [ ] Monitor Core Web Vitals
- [ ] Reduce third-party scripts
- [ ] Optimize CSS delivery

## Real-World Results

Applying these techniques to the **Debmalya Biswas portfolio**:
- LCP: 1.2s (from 3.5s)
- FID: 45ms (from 180ms)
- CLS: 0.02 (from 0.25)
- Lighthouse: 98/100

## Conclusion

Performance optimization is ongoing. These techniques have dramatically improved the **Debmalya Biswas website** and can help your projects too.

Keep optimizing!

---

*Debmalya Biswas is a frontend developer specializing in performance optimization, React, and modern web development. Explore the Debmalya Biswas portfolio for more insights.*
    `
  },
  {
    slug: "frontend-development-career-guide-2024",
    title: "Frontend Development Career Guide 2024 - Debmalya Biswas",
    description: "Complete career guide for aspiring frontend developers by Debmalya Biswas. Learn the skills, tools, and strategies to become a successful frontend SDE.",
    author: "Debmalya Biswas",
    date: "2024-11-18",
    readTime: "10 min read",
    tags: ["Career", "Frontend Development", "Learning", "Guide"],
    image: "/assets/blog/career-guide.svg",
    keywords: ["Debmalya Biswas", "frontend developer", "Debmalya SDE", "frontend career", "Debmalya Biswas portfolio"],
    content: `
# Frontend Development Career Guide 2024

Hi there! I'm **Debmalya Biswas**, and today I'm sharing my journey and insights on building a successful career as a frontend developer.

## My Journey

As **Debmalya Biswas, SDE**, my path to frontend development wasn't linear. I started with basic HTML/CSS and gradually built expertise in modern frameworks and tools.

## Essential Skills for Frontend Developers

### 1. Core Technologies

**HTML/CSS**: Master semantic HTML and modern CSS:
\`\`\`css
/* Flexbox & Grid */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* CSS Variables */
:root {
  --primary-color: #8b5cf6;
  --spacing-unit: 8px;
}
\`\`\`

**JavaScript**: Deep understanding of ES6+ features:
\`\`\`javascript
// Destructuring, spread, async/await
const { name, age } = user
const updatedUser = { ...user, role: 'developer' }
const data = await fetch(url).then(r => r.json())
\`\`\`

### 2. React Ecosystem

The **Debmalya Biswas portfolio** is built with React. Key concepts:

- Components and Props
- State Management (useState, useReducer, Context)
- Side Effects (useEffect)
- Custom Hooks
- Performance Optimization

\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
\`\`\`

### 3. TypeScript

Type safety is crucial. As **Debmalya Biswas, frontend developer**, I use TypeScript everywhere:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

function processUser(user: User): string {
  return \`\${user.name} (\${user.role})\`
}
\`\`\`

### 4. Modern Frameworks

Master at least one framework:
- **Next.js**: Full-stack React framework
- **Remix**: Progressive web framework
- **Vue/Nuxt**: Alternative ecosystem
- **Svelte/SvelteKit**: Compiler-based approach

### 5. State Management

\`\`\`typescript
// Context API for simple state
const ThemeContext = createContext<Theme>('light')

// Zustand for complex state
import create from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))
\`\`\`

## Tools Every Frontend Developer Needs

### Version Control
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### Package Managers
\`\`\`bash
# npm, pnpm, or yarn
pnpm install
pnpm add react
\`\`\`

### Build Tools
- **Vite**: Lightning-fast dev server
- **Webpack**: Powerful bundler
- **esbuild**: Extremely fast bundler

### Development Tools
- VS Code with extensions
- Chrome DevTools
- React DevTools
- ESLint & Prettier

## Building Your Portfolio

The **Debmalya Biswas website** showcases:

### 1. Projects
Build real projects, not just tutorials:
- Personal portfolio (like mine!)
- Full-stack application
- Open source contributions
- Side projects solving real problems

### 2. Blog
Share your knowledge:
- Technical tutorials
- Learning journey
- Problem-solving approaches
- Industry insights

### 3. Resume
Highlight:
- Technologies you know
- Projects you've built
- Impact you've created
- Continuous learning

## Learning Path

### Beginner (0-6 months)
1. HTML, CSS, JavaScript fundamentals
2. Responsive design
3. Git basics
4. Build simple projects

### Intermediate (6-12 months)
1. React or Vue
2. TypeScript
3. API integration
4. State management
5. Build complex applications

### Advanced (12+ months)
1. Performance optimization
2. Testing (Jest, React Testing Library)
3. CI/CD
4. SSR/SSG
5. Advanced patterns

## Job Search Strategies

As **Debmalya Biswas, SDE**, here's my advice:

### 1. Build in Public
Share your progress on:
- GitHub
- Twitter
- LinkedIn
- Dev.to

### 2. Network
- Attend meetups
- Join Discord communities
- Contribute to open source
- Engage on social media

### 3. Prepare for Interviews

**Technical Preparation:**
\`\`\`javascript
// Know your data structures
const map = new Map()
const set = new Set()

// Algorithm practice
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}
\`\`\`

**System Design:**
- Component architecture
- State management patterns
- API design
- Performance considerations

### 4. Soft Skills
- Communication
- Problem-solving
- Collaboration
- Time management

## Continuous Learning

Stay updated with:
- Frontend newsletters
- Tech Twitter
- YouTube channels
- Podcasts
- Documentation

### Resources I Recommend:
1. **MDN Web Docs**: Comprehensive reference
2. **React Documentation**: Official React docs
3. **TypeScript Handbook**: Learn TypeScript
4. **Next.js Learn**: Interactive tutorials
5. **Frontend Masters**: In-depth courses

## Common Mistakes to Avoid

As **Debmalya Biswas, frontend developer**, I've learned from these mistakes:

1. **Tutorial Hell**: Build real projects
2. **Ignoring Fundamentals**: Master JavaScript
3. **Not Writing Tests**: Learn TDD
4. **Poor Git Habits**: Write meaningful commits
5. **Neglecting Accessibility**: Build for everyone

## Building the Debmalya Biswas Portfolio

Key features I implemented:
- Responsive design
- Dark mode
- Smooth animations
- SEO optimization
- Performance optimization
- Accessibility

\`\`\`typescript
// Example: Responsive navigation
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      <button onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>
      {isOpen && (
        <ul>
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
\`\`\`

## Salary Expectations

Frontend developer salaries vary by:
- Location
- Experience level
- Company size
- Technology stack

### Typical Ranges (2024):
- **Junior**: $60k-$85k
- **Mid-level**: $85k-$120k
- **Senior**: $120k-$180k+
- **Lead/Staff**: $180k-$250k+

## Remote Work

The **Debmalya Biswas** approach to remote work:
- Clear communication
- Documentation
- Async collaboration
- Work-life balance
- Continuous delivery

## Future of Frontend Development

Trends to watch:
- Server Components
- Edge computing
- AI-assisted development
- Web Assembly
- Progressive Web Apps

## Conclusion

Building a frontend development career is challenging but rewarding. The **Debmalya Biswas portfolio** represents years of learning and growth.

Stay curious, keep building, and never stop learning!

---

*Debmalya Biswas is a frontend SDE passionate about React, TypeScript, and modern web development. Connect with me to discuss frontend development and career growth.*
    `
  },
  {
    slug: "react-performance-optimization-techniques",
    title: "React Performance Optimization Techniques by Debmalya Biswas",
    description: "Master React performance optimization with Debmalya Biswas. Learn advanced techniques to build lightning-fast React applications.",
    author: "Debmalya Biswas",
    date: "2024-11-15",
    readTime: "10 min read",
    tags: ["React", "Performance", "Optimization", "Frontend"],
    image: "/assets/blog/react-performance.svg",
    keywords: ["Debmalya Biswas", "React performance", "Debmalya frontend", "Debmalya SDE"],
    content: `
# React Performance Optimization Techniques

Hey! **Debmalya Biswas** here. Today I'm sharing advanced React performance optimization techniques I use to build fast, responsive applications like the **Debmalya Biswas portfolio**.

## Understanding React Performance

As **Debmalya Biswas, frontend developer**, I've learned that React performance comes down to:
- Minimizing re-renders
- Reducing bundle size
- Optimizing expensive operations
- Efficient data fetching

## Memoization Techniques

### React.memo

Prevent unnecessary re-renders:

\`\`\`typescript
interface UserCardProps {
  user: User
  onSelect: (id: string) => void
}

const UserCard = React.memo(({ user, onSelect }: UserCardProps) => {
  return (
    <div onClick={() => onSelect(user.id)}>
      {user.name}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.user.id === nextProps.user.id
})
\`\`\`

### useMemo

Cache expensive computations:

\`\`\`typescript
function DataTable({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    console.log('Sorting items...')
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])

  return (
    <div>
      <p>Total: {totalValue}</p>
      {sortedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
\`\`\`

### useCallback

Memoize callback functions:

\`\`\`typescript
function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState('all')

  // Memoize callback to prevent child re-renders
  const handleToggle = useCallback((id: string) => {
    toggleTodo(id)
  }, []) // Empty deps if toggleTodo is stable

  const handleDelete = useCallback((id: string) => {
    deleteTodo(id)
  }, [])

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
\`\`\`

## Virtualization

For large lists, use virtualization. In the **Debmalya Biswas website**, I implement this for data-heavy sections:

\`\`\`typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: \`\${virtualItem.size}px\`,
              transform: \`translateY(\${virtualItem.start}px)\`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

## Code Splitting

### Dynamic Imports

\`\`\`typescript
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
const AdminPanel = lazy(() => import('./AdminPanel'))

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <AdminPanel />
      </Suspense>
    </div>
  )
}
\`\`\`

### Route-Based Splitting

\`\`\`typescript
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Blog = lazy(() => import('./pages/Blog'))
const About = lazy(() => import('./pages/About'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
\`\`\`

## State Management Optimization

### Context Splitting

As **Debmalya Biswas, SDE**, I split contexts to minimize re-renders:

\`\`\`typescript
// Bad - One large context
const AppContext = createContext({ user, theme, settings })

// Good - Split contexts
const UserContext = createContext(user)
const ThemeContext = createContext(theme)
const SettingsContext = createContext(settings)

// Even better - Use selectors
function useUser() {
  const context = useContext(AppContext)
  return context.user
}
\`\`\`

### Zustand for Global State

\`\`\`typescript
import create from 'zustand'

interface Store {
  user: User | null
  setUser: (user: User) => void
  posts: Post[]
  addPost: (post: Post) => void
}

const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  posts: [],
  addPost: (post) => set((state) => ({
    posts: [...state.posts, post]
  })),
}))

// Use only what you need
function UserProfile() {
  const user = useStore(state => state.user)
  // Only re-renders when user changes
}
\`\`\`

## Debouncing and Throttling

\`\`\`typescript
function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        const data = await searchAPI(searchQuery)
        setResults(data)
      }, 300),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <SearchResults results={results} />
    </div>
  )
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
\`\`\`

## Image Optimization

Used throughout the **Debmalya Biswas portfolio**:

\`\`\`typescript
import Image from 'next/image'

function OptimizedImage() {
  return (
    <>
      {/* Above-fold images */}
      <Image
        src="/hero.jpg"
        width={1200}
        height={600}
        priority
        alt="Hero"
      />

      {/* Below-fold images */}
      <Image
        src="/project.jpg"
        width={800}
        height={400}
        loading="lazy"
        alt="Project"
      />

      {/* Responsive images */}
      <Image
        src="/banner.jpg"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="Banner"
      />
    </>
  )
}
\`\`\`

## useTransition for Concurrent Features

\`\`\`typescript
function SearchableList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [items, query])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Mark this update as low priority
    startTransition(() => {
      setQuery(value)
    })
  }

  return (
    <div>
      <input
        onChange={handleSearch}
        placeholder="Search..."
      />
      {isPending && <Spinner />}
      <List items={filteredItems} />
    </div>
  )
}
\`\`\`

## Profiling and Measuring

### React DevTools Profiler

\`\`\`typescript
import { Profiler } from 'react'

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(\`\${id} took \${actualDuration}ms to \${phase}\`)
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  )
}
\`\`\`

### Custom Performance Hooks

\`\`\`typescript
function usePerformance(componentName: string) {
  useEffect(() => {
    const start = performance.now()

    return () => {
      const end = performance.now()
      console.log(\`\${componentName} rendered in \${end - start}ms\`)
    }
  })
}

function MyComponent() {
  usePerformance('MyComponent')
  // Component logic
}
\`\`\`

## Web Workers for Heavy Computation

\`\`\`typescript
// worker.ts
self.addEventListener('message', (e) => {
  const result = expensiveComputation(e.data)
  self.postMessage(result)
})

// Component
function DataProcessor() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const worker = new Worker('/worker.js')

    worker.onmessage = (e) => {
      setResult(e.data)
    }

    worker.postMessage(largeDataset)

    return () => worker.terminate()
  }, [])

  return <div>{result}</div>
}
\`\`\`

## Best Practices Checklist

As **Debmalya Biswas, frontend developer**, I follow this checklist:

- [ ] Use React.memo for expensive components
- [ ] Implement useMemo for expensive calculations
- [ ] Use useCallback for stable callbacks
- [ ] Implement virtualization for long lists
- [ ] Code split routes and heavy components
- [ ] Optimize images
- [ ] Debounce user inputs
- [ ] Use concurrent features
- [ ] Profile and measure performance
- [ ] Lazy load below-fold content

## Real Results

These techniques improved the **Debmalya Biswas website**:
- Initial load: 1.2s (from 4.5s)
- Time to Interactive: 1.8s (from 5.2s)
- Bundle size: 45KB (from 180KB)

## Conclusion

React performance optimization is about making smart trade-offs. Apply these techniques strategically where they matter most.

Keep building fast!

---

*Debmalya Biswas is a frontend SDE specializing in React performance optimization and modern web development. Visit the Debmalya Biswas portfolio for more insights.*
    `
  }
]

// Helper functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

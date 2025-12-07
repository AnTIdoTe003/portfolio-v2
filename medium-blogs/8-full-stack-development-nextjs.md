# Full-Stack Development with Next.js: Building Production-Ready Applications

Next.js has evolved from a React framework into a comprehensive full-stack solution. With features like API routes, server components, and built-in optimizations, it's become the go-to choice for building modern web applications.

I'm **Debmalya Biswas**, a Frontend & Full Stack Engineer, and in this article, I'll share my experience building full-stack applications with Next.js at SaffronStays and in my personal projects, including my [portfolio website](https://www.debmalya.in/).

## Why Next.js for Full-Stack?

Next.js provides:

- **API Routes** - Build backend endpoints without separate server
- **Server Components** - Efficient server-side rendering
- **Built-in Optimizations** - Image optimization, code splitting, and more
- **TypeScript Support** - First-class TypeScript support
- **Deployment Ready** - Easy deployment to Vercel or any platform

## Project Structure

Organize your full-stack Next.js application:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── api/
│   ├── auth/
│   │   └── route.ts
│   ├── users/
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   └── posts/
│       └── route.ts
├── components/
│   ├── ui/
│   └── features/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## API Routes

### Basic API Route

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await db.user.create({
      data: body,
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await db.user.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
```

## Database Integration

### Prisma Setup

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Database Schema

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Authentication

### NextAuth.js Integration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### Protected Routes

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
```

## Server Components for Data Fetching

### Fetching Data in Server Components

```typescript
// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

async function getDashboardData(userId: string) {
  const [user, posts, stats] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findMany({
      where: { authorId: userId },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    db.post.aggregate({
      where: { authorId: userId },
      _count: true,
    }),
  ]);

  return { user, posts, stats };
}

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  const { user, posts, stats } = await getDashboardData(session.user.id);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <div>
        <p>Total Posts: {stats._count}</p>
      </div>
      <div>
        <h2>Recent Posts</h2>
        {posts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

## Form Handling

### Server Actions

```typescript
// app/actions/post.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export async function createPost(formData: FormData) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const post = await db.post.create({
    data: {
      title,
      content,
      authorId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return post;
}
```

### Using Server Actions in Forms

```typescript
// app/components/CreatePostForm.tsx
"use client";

import { createPost } from "@/app/actions/post";
import { useTransition } from "react";

export function CreatePostForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createPost(formData);
        // Form will be reset automatically
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="title" type="text" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### API Error Handling

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Usage in API routes
export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Caching Strategies

### Route Segment Config

```typescript
// app/dashboard/page.tsx
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static"; // or 'force-dynamic'

export default async function DashboardPage() {
  // Page implementation
}
```

### Data Caching

```typescript
async function getCachedData() {
  const data = await fetch("https://api.example.com/data", {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: ["data"], // Tag for on-demand revalidation
    },
  });
  return data.json();
}

// On-demand revalidation
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  // Update data
  revalidateTag("data");
  return NextResponse.json({ success: true });
}
```

## Environment Variables

```typescript
// .env.local
DATABASE_URL = "postgresql://...";
NEXTAUTH_SECRET = "your-secret";
NEXTAUTH_URL = "http://localhost:3000";
NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
```

```typescript
// lib/env.ts
export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  nextAuthUrl: process.env.NEXTAUTH_URL!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
};
```

## Deployment

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Best Practices

1. **Use Server Components by Default** - Only use Client Components when needed
2. **Implement Proper Error Handling** - Use error boundaries and try-catch
3. **Cache Strategically** - Balance freshness with performance
4. **Validate Input** - Validate on both client and server
5. **Use TypeScript** - Type safety across the stack
6. **Implement Authentication** - Secure your API routes
7. **Monitor Performance** - Use analytics and monitoring tools

## Real-World Application

I've built full-stack applications using these patterns at SaffronStays and in my personal projects. My [portfolio website](https://www.debmalya.in/) demonstrates many of these concepts, including:

- Server Components for efficient rendering
- API routes for backend functionality
- Database integration
- Authentication and authorization
- Optimized performance

## Conclusion

Next.js provides everything you need to build production-ready full-stack applications. By leveraging Server Components, API routes, and built-in optimizations, you can create fast, scalable applications with a single framework.

Start with the basics—API routes and Server Components—then gradually add more advanced features like authentication, database integration, and caching strategies.

---

**About the Author:** Debmalya Biswas is a Frontend & Full Stack Engineer at SaffronStays, specializing in Next.js, React, and full-stack development. He's passionate about building scalable, production-ready applications. Visit his [portfolio](https://www.debmalya.in/) to see full-stack Next.js applications in action, or connect with him on [GitHub](https://github.com/AnTIdoTe003) and [LinkedIn](https://www.linkedin.com/in/debmalya-biswas-340655209).

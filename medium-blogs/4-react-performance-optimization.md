# React Performance Optimization: Advanced Techniques for Production Apps

Performance is crucial for user experience and business metrics. A slow application can lead to user frustration, increased bounce rates, and lost revenue. As a Frontend Engineer working on production applications, I've learned that React performance optimization requires a strategic approach.

I'm **Debmalya Biswas**, and in this article, I'll share advanced React performance optimization techniques I've used to improve application performance at SaffronStays and in my personal projects, including my [portfolio website](https://www.debmalya.in/).

## Understanding React Performance

React performance issues typically manifest as:

- Slow initial page loads
- Laggy user interactions
- High memory usage
- Unnecessary re-renders

Before optimizing, always measure. Use React DevTools Profiler to identify bottlenecks.

## Memoization Techniques

### React.memo

Prevent unnecessary re-renders of functional components:

```typescript
interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  onSelect: (id: string) => void;
}

const UserCard = React.memo(
  ({ user, onSelect }: UserCardProps) => {
    console.log(`Rendering UserCard: ${user.name}`);

    return (
      <div onClick={() => onSelect(user.id)}>
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    );
  }
);
```

### useMemo for Expensive Computations

Cache expensive calculations:

```typescript
function DataTable({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  // Expensive computation - only recalculate when items, filter, or sortBy changes
  const processedItems = useMemo(() => {
    console.log("Processing items...");

    let result = items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.date.getTime() - b.date.getTime();
    });

    return result;
  }, [items, filter, sortBy]);

  const totalValue = useMemo(() => {
    return processedItems.reduce((sum, item) => sum + item.value, 0);
  }, [processedItems]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <p>Total: {totalValue}</p>
      {processedItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### useCallback for Stable References

Memoize callback functions to prevent child re-renders:

```typescript
function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState("all");

  // Memoize callbacks to prevent child re-renders
  const handleToggle = useCallback((id: string) => {
    // Toggle logic
    updateTodo(id);
  }, []); // Empty deps if updateTodo is stable

  const handleDelete = useCallback((id: string) => {
    deleteTodo(id);
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  return (
    <div>
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## Virtualization for Large Lists

For long lists, use virtualization to render only visible items:

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated item height
    overscan: 5, // Render 5 extra items outside viewport
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Code Splitting

### Route-Based Splitting

```typescript
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Component-Level Splitting

```typescript
import { lazy, Suspense } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));
const DataTable = lazy(() => import("./DataTable"));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

## State Management Optimization

### Context Splitting

Split contexts to minimize re-renders:

```typescript
// ❌ Bad - One large context causes all consumers to re-render
const AppContext = createContext({
  user: null,
  theme: "light",
  settings: {},
  notifications: [],
});

// ✅ Good - Split into separate contexts
const UserContext = createContext(null);
const ThemeContext = createContext("light");
const SettingsContext = createContext({});

// ✅ Even better - Use selectors
function useUser() {
  const context = useContext(AppContext);
  return context.user; // Only re-renders when user changes
}
```

### Zustand for Global State

Zustand provides excellent performance with minimal boilerplate:

```typescript
import create from "zustand";

interface Store {
  user: User | null;
  setUser: (user: User) => void;
  posts: Post[];
  addPost: (post: Post) => void;
}

const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
}));

// Only re-renders when user changes
function UserProfile() {
  const user = useStore((state) => state.user);
  return <div>{user?.name}</div>;
}

// Only re-renders when posts change
function PostList() {
  const posts = useStore((state) => state.posts);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## Debouncing and Throttling

### Debounced Search

```typescript
import { useMemo } from "react";
import { debounce } from "lodash";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([]);
          return;
        }

        const data = await searchAPI(searchQuery);
        setResults(data);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <SearchResults results={results} />
    </div>
  );
}
```

### Custom Debounce Hook

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## useTransition for Concurrent Features

Use `useTransition` for non-urgent updates:

```typescript
import { useTransition, useState } from "react";

function SearchableList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Mark this update as low priority
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div>
      <input onChange={handleSearch} placeholder="Search..." />
      {isPending && <Spinner />}
      <List items={filteredItems} />
    </div>
  );
}
```

## Image Optimization

Optimize images for better performance:

```typescript
import Image from "next/image";

function OptimizedImages() {
  return (
    <>
      {/* Above-fold images - preload */}
      <Image src="/hero.jpg" width={1200} height={600} priority alt="Hero" />

      {/* Below-fold images - lazy load */}
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
  );
}
```

## Performance Monitoring

### React Profiler

```typescript
import { Profiler } from "react";

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number
) {
  if (actualDuration > 16) {
    // Longer than one frame
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}
```

## Performance Checklist

When optimizing React applications:

- [ ] Use React.memo for expensive components
- [ ] Implement useMemo for expensive calculations
- [ ] Use useCallback for stable function references
- [ ] Implement virtualization for long lists
- [ ] Code split routes and heavy components
- [ ] Optimize images (WebP, lazy loading)
- [ ] Debounce user inputs
- [ ] Use useTransition for non-urgent updates
- [ ] Split contexts to minimize re-renders
- [ ] Profile and measure performance

## Real-World Results

Applying these techniques to my [portfolio website](https://www.debmalya.in/) resulted in:

- Initial load time: 1.2s (from 4.5s)
- Time to Interactive: 1.8s (from 5.2s)
- Bundle size: 45KB gzipped (from 180KB)
- Lighthouse Performance: 98/100

## Conclusion

React performance optimization is an ongoing process. Start by measuring, identify bottlenecks, and apply these techniques strategically. Not every optimization is necessary—focus on what provides the most value.

The techniques I've shared here are battle-tested in production environments. By implementing them thoughtfully, you can significantly improve your React application's performance and user experience.

---

**About the Author:** Debmalya Biswas is a Frontend & Full Stack Engineer at SaffronStays, specializing in React performance optimization and modern web development. He's passionate about building fast, efficient applications. Check out his [portfolio](https://www.debmalya.in/) to see performance optimizations in action, or connect with him on [GitHub](https://github.com/AnTIdoTe003) and [LinkedIn](https://www.linkedin.com/in/debmalya-biswas-340655209).

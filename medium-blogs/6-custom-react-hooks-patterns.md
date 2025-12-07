# Custom React Hooks: Advanced Patterns for Reusable Logic

Custom hooks are one of React's most powerful features for code reuse and logic separation. They allow you to extract component logic into reusable functions, making your code more maintainable and testable.

I'm **Debmalya Biswas**, a Frontend & Full Stack Engineer, and in this article, I'll share advanced custom hook patterns I've developed while building production applications at SaffronStays and in my personal projects, including my [portfolio website](https://www.debmalya.in/).

## Why Custom Hooks Matter

Custom hooks enable:

- **Logic reuse** across components
- **Separation of concerns** between UI and business logic
- **Easier testing** of isolated logic
- **Better code organization**

## Data Fetching Hooks

### Basic Data Fetching Hook

```typescript
interface UseDataFetchOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn();

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    let interval: NodeJS.Timeout | null = null;
    if (options.refetchInterval) {
      interval = setInterval(fetchData, options.refetchInterval);
    }

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [fetchFn, options.enabled, options.refetchInterval]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    loading,
    error,
  } = useDataFetch(() => userService.getUser(userId), { enabled: !!userId });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

### Advanced Data Fetching with Mutations

```typescript
interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationOptions<TData, TVariables> = {}
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      try {
        setLoading(true);
        setError(null);
        const result = await mutationFn(variables);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err as Error;
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, options]
  );

  return { mutate, data, loading, error };
}

// Usage
function CreateUserForm() {
  const {
    mutate: createUser,
    loading,
    error,
  } = useMutation(
    (userData: CreateUserDto) => userService.createUser(userData),
    {
      onSuccess: () => {
        toast.success("User created successfully!");
      },
      onError: (error) => {
        toast.error(`Failed: ${error.message}`);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createUser({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

## UI Interaction Hooks

### useClickOutside

```typescript
function useClickOutside<T extends HTMLElement>(
  handler: () => void
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <DropdownMenu />}
    </div>
  );
}
```

### useMediaQuery

```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

### useDebounce

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
function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### useThrottle

```typescript
function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Usage
function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 100);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div>Scroll: {throttledScrollY}px</div>;
}
```

## State Management Hooks

### useLocalStorage

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    "light"
  );

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <button onClick={toggle}>Current theme: {theme}</button>;
}
```

### usePrevious

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount ?? "N/A"}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useToggle

```typescript
function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}

// Usage
function Modal() {
  const [isOpen, toggle, setIsOpen] = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && (
        <div>
          <button onClick={toggle}>Close</button>
        </div>
      )}
    </>
  );
}
```

## Form Handling Hooks

### useForm

```typescript
interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleChange = useCallback(
    (name: keyof T) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(name, e.target.value);
      },
    [setValue]
  );

  const handleBlur = useCallback(
    (name: keyof T) => () => {
      setFieldTouched(name);
      if (validate) {
        const validationErrors = validate(values);
        if (validationErrors[name]) {
          setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
        }
      }
    },
    [values, validate, setFieldTouched]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, validate]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

// Usage
function LoginForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    onSubmit: async (values) => {
      await authService.login(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
      />
      {touched.email && errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
      />
      {touched.password && errors.password && <span>{errors.password}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## Advanced Patterns

### Composing Hooks

Combine multiple hooks for complex functionality:

```typescript
function useUserProfile(userId: string) {
  const {
    data: user,
    loading,
    error,
  } = useDataFetch(() => userService.getUser(userId), { enabled: !!userId });

  const { mutate: updateUser, loading: updating } = useMutation(
    (data: UpdateUserDto) => userService.updateUser(userId, data)
  );

  return {
    user,
    loading,
    error,
    updateUser,
    updating,
  };
}
```

### Hook Factories

Create hooks dynamically:

```typescript
function createUseResource<T>(resourceName: string) {
  return function useResource(id: string) {
    const { data, loading, error } = useDataFetch(() =>
      fetch(`/api/${resourceName}/${id}`).then((r) => r.json())
    );

    return { [resourceName]: data, loading, error };
  };
}

const useUser = createUseResource<User>("user");
const usePost = createUseResource<Post>("post");
```

## Testing Custom Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("toggles value", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](); // toggle
    });

    expect(result.current[0]).toBe(true);
  });
});
```

## Best Practices

1. **Start with `use` prefix** - Follow React naming convention
2. **Return consistent structure** - Use objects or tuples consistently
3. **Handle cleanup** - Clean up subscriptions, timers, and event listeners
4. **Memoize callbacks** - Use `useCallback` for returned functions
5. **Document dependencies** - Clearly document what the hook depends on
6. **Test in isolation** - Test hooks separately from components

## Real-World Application

I've implemented many of these hooks in my [portfolio website](https://www.debmalya.in/) and production applications. Custom hooks have been instrumental in:

- Reducing code duplication
- Improving testability
- Separating concerns
- Creating reusable logic

## Conclusion

Custom hooks are a powerful tool for building maintainable React applications. By extracting logic into reusable hooks, you can write cleaner components and share functionality across your application.

Start with simple hooks and gradually build more complex ones as patterns emerge. The hooks I've shared here provide a solid foundation for common use cases.

---

**About the Author:** Debmalya Biswas is a Frontend & Full Stack Engineer at SaffronStays, specializing in React, Next.js, and modern web development. He's passionate about building reusable, maintainable code. Check out his [portfolio](https://www.debmalya.in/) to see custom hooks in action, or connect with him on [GitHub](https://github.com/AnTIdoTe003) and [LinkedIn](https://www.linkedin.com/in/debmalya-biswas-340655209).

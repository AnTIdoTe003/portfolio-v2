# TypeScript + React: Best Practices for Type-Safe Frontend Development

TypeScript has become the standard for building production React applications. As a Frontend Engineer who's worked on multiple large-scale projects, I've learned that proper TypeScript usage can dramatically improve code quality and developer experience.

I'm **Debmalya Biswas**, and in this article, I'll share TypeScript best practices I've learned while building React applications at SaffronStays and in my personal projects, including my [portfolio website](https://www.debmalya.in/).

## Why TypeScript Matters

TypeScript provides:

- **Compile-time error detection** - Catch bugs before they reach production
- **Better IDE support** - Autocomplete, refactoring, and navigation
- **Self-documenting code** - Types serve as inline documentation
- **Improved refactoring confidence** - Change code with certainty

## Component Props Typing

### Basic Props Interface

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  size = "md",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
    >
      {label}
    </button>
  );
}
```

### Children Props

```typescript
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Container({
  children,
  className,
  maxWidth = "lg",
}: ContainerProps) {
  return (
    <div className={`container container-${maxWidth} ${className || ""}`}>
      {children}
    </div>
  );
}
```

## Event Handler Typing

Properly typing event handlers is crucial:

```typescript
interface FormProps {
  onSubmit: (data: FormData) => void;
}

function ContactForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Handle change
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Handle click
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button type="button" onClick={handleButtonClick}>
        Submit
      </button>
    </form>
  );
}
```

## Generic Components

Generic components provide flexibility while maintaining type safety:

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items found'
}: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>
  }

  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// Usage
interface User {
  id: string
  name: string
  email: string
}

const users: User[] = [
  { id: '1', name: 'John', email: 'john@example.com' }
]

<List
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id}
/>
```

## Hooks with TypeScript

### useState

```typescript
// Type inference
const [count, setCount] = useState(0); // number

// Explicit typing for nullable values
const [user, setUser] = useState<User | null>(null);

// Complex initial state
interface FormState {
  email: string;
  password: string;
  errors: Record<string, string>;
}

const [formState, setFormState] = useState<FormState>({
  email: "",
  password: "",
  errors: {},
});
```

### useRef

```typescript
// DOM element refs
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

// Mutable value refs
const timerRef = useRef<NodeJS.Timeout | null>(null);

const startTimer = () => {
  timerRef.current = setTimeout(() => {
    console.log("Timer finished");
  }, 1000);
};
```

### useReducer

```typescript
type State = {
  count: number;
  step: number;
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; step: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.step };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

## Custom Hooks

Type your custom hooks properly:

```typescript
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return { value: storedValue, setValue, removeValue };
}
```

## API Integration

### Typed Fetch Wrapper

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

const { data: user } = await fetchApi<User>("/api/user");
// user is typed as User
```

## Utility Types

Leverage TypeScript's utility types:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
}

// Pick specific properties
type UserPreview = Pick<User, "id" | "name" | "email">;

// Omit properties
type UserWithoutPassword = Omit<User, "password">;

// Partial for updates
type UserUpdate = Partial<Pick<User, "name" | "email">>;

// Required makes all properties required
type RequiredUser = Required<User>;

// Record for key-value mappings
type UserRoles = Record<string, User["role"]>;
```

## Discriminated Unions

Use discriminated unions for type-safe state management:

```typescript
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function DataDisplay<T>({ state }: { state: AsyncState<T> }) {
  switch (state.status) {
    case "idle":
      return <div>Click to load</div>;
    case "loading":
      return <div>Loading...</div>;
    case "success":
      return <div>{JSON.stringify(state.data)}</div>;
    case "error":
      return <div>Error: {state.error.message}</div>;
  }
}
```

## Common Patterns

### Form Handling

```typescript
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange =
    <K extends keyof FormData>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <form>
      <input
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
      />
      <input
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
      />
      <input
        type="checkbox"
        checked={formData.rememberMe}
        onChange={handleChange("rememberMe")}
      />
    </form>
  );
}
```

## Best Practices

1. **Avoid `any`**: Use `unknown` when the type is truly unknown
2. **Use type inference**: Let TypeScript infer types when obvious
3. **Prefer interfaces for objects**: Use types for unions and primitives
4. **Use const assertions**: For literal types
5. **Leverage utility types**: Don't reinvent the wheel

## TypeScript Configuration

Recommended `tsconfig.json` settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true
  }
}
```

## Conclusion

TypeScript with React provides a powerful combination for building type-safe, maintainable applications. The patterns I've shared here are ones I use daily in production code at SaffronStays and in my personal projects.

By following these best practices, you'll write more robust code, catch errors earlier, and improve your overall development experience. The investment in learning TypeScript pays off quickly as your codebase grows.

I've implemented these patterns extensively in my [portfolio website](https://www.debmalya.in/), and the type safety has been invaluable for maintaining code quality. Start applying these patterns in your React projects, and you'll quickly see the benefits.

---

**About the Author:** Debmalya Biswas is a Frontend & Full Stack Engineer at SaffronStays, specializing in React, TypeScript, and Next.js. He's passionate about building type-safe, performant web applications. Visit his [portfolio](https://www.debmalya.in/) to see examples of his work, or connect with him on [GitHub](https://github.com/AnTIdoTe003) and [LinkedIn](https://www.linkedin.com/in/debmalya-biswas-340655209).

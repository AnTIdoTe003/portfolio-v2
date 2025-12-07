# Web Accessibility in React: Building Inclusive Applications

Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. As developers, it's our responsibility to build inclusive digital experiences. Unfortunately, accessibility is often overlooked or treated as an afterthought.

I'm **Debmalya Biswas**, a Frontend & Full Stack Engineer, and in this article, I'll share practical accessibility techniques I've implemented in production applications at SaffronStays and in my personal projects, including my [portfolio website](https://www.debmalya.in/).

## Why Accessibility Matters

Accessibility benefits everyone:

- **Legal compliance** - Many countries require accessible websites
- **Broader audience** - 15% of the world's population has some form of disability
- **Better SEO** - Accessible sites rank better in search engines
- **Improved UX** - Accessible design is often better design for everyone

## Semantic HTML

### Use Proper HTML Elements

```typescript
// ❌ Bad - Using divs for everything
function Navigation() {
  return (
    <div>
      <div onClick={handleClick}>Home</div>
      <div onClick={handleClick}>About</div>
    </div>
  );
}

// ✅ Good - Semantic HTML
function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
```

### Proper Heading Hierarchy

```typescript
function Article() {
  return (
    <article>
      <h1>Main Title</h1>
      <section>
        <h2>Section Title</h2>
        <h3>Subsection Title</h3>
      </section>
    </article>
  );
}
```

## ARIA Attributes

### aria-label and aria-labelledby

```typescript
function IconButton() {
  return (
    <button aria-label="Close dialog">
      <CloseIcon />
    </button>
  );
}

function SearchForm() {
  return (
    <form>
      <label htmlFor="search-input">Search</label>
      <input id="search-input" type="search" />
      <button aria-label="Submit search">Search</button>
    </form>
  );
}
```

### aria-describedby

```typescript
function FormField() {
  const [error, setError] = useState("");

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-describedby={error ? "email-error" : "email-help"}
        aria-invalid={!!error}
      />
      {error ? (
        <span id="email-error" role="alert">
          {error}
        </span>
      ) : (
        <span id="email-help">Enter your email address</span>
      )}
    </div>
  );
}
```

### aria-live Regions

```typescript
function NotificationSystem() {
  const [notifications, setNotifications] = useState<string[]>([]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      className="sr-only"
    >
      {notifications.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}
```

## Keyboard Navigation

### Focus Management

```typescript
function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus modal
      modalRef.current?.focus();
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
      <h2 id="modal-title">Modal Title</h2>
      {children}
    </div>
  );
}
```

### Keyboard Event Handlers

```typescript
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const items = ["Option 1", "Option 2", "Option 3"];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectItem(items[focusedIndex]);
        setIsOpen(false);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <button onClick={() => setIsOpen(!isOpen)}>Select Option</button>
      {isOpen && (
        <ul role="listbox">
          {items.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={index === focusedIndex}
              className={index === focusedIndex ? "focused" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Screen Reader Support

### Skip Links

```typescript
function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <a href="#navigation" className="sr-only focus:not-sr-only">
        Skip to navigation
      </a>
    </div>
  )
}

// CSS
.skip-links a {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-links a:focus {
  top: 0;
}
```

### Screen Reader Only Content

```typescript
// CSS utility class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Usage
function LoadingSpinner() {
  return (
    <div role="status" aria-live="polite">
      <Spinner />
      <span className="sr-only">Loading content...</span>
    </div>
  )
}
```

## Form Accessibility

### Proper Labels

```typescript
function AccessibleForm() {
  return (
    <form>
      {/* Explicit label */}
      <label htmlFor="name">Full Name</label>
      <input id="name" type="text" required />

      {/* Implicit label */}
      <label>
        Email Address
        <input type="email" required />
      </label>

      {/* aria-label for icon-only inputs */}
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search..."
      />

      {/* aria-labelledby for complex labels */}
      <div id="password-label">
        Password
        <span>(must be at least 8 characters)</span>
      </div>
      <input
        type="password"
        aria-labelledby="password-label"
        aria-describedby="password-help"
        required
      />
      <span id="password-help">Enter a secure password</span>
    </form>
  );
}
```

### Error Handling

```typescript
function FormField({ name, label, error, ...props }: FormFieldProps) {
  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;
  const helpId = `help-${name}`;

  return (
    <div>
      <label htmlFor={fieldId}>
        {label}
        {props.required && <span aria-label="required">*</span>}
      </label>
      <input
        id={fieldId}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helpId}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className="error">
          {error}
        </span>
      )}
      {!error && (
        <span id={helpId} className="help-text">
          {props["aria-describedby"]}
        </span>
      )}
    </div>
  );
}
```

## Color and Contrast

### Sufficient Contrast

```typescript
// Use WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
// Test with tools like WebAIM Contrast Checker

function AccessibleButton() {
  return (
    <button
      className="bg-blue-600 text-white"
      // Ensure 4.5:1 contrast ratio
      style={{
        backgroundColor: "#2563eb", // Meets contrast requirements
        color: "#ffffff",
      }}
    >
      Submit
    </button>
  );
}
```

### Don't Rely on Color Alone

```typescript
// ❌ Bad - Color only
function StatusBadge({ status }: { status: "success" | "error" }) {
  return (
    <span className={status === "success" ? "text-green" : "text-red"}>
      {status}
    </span>
  );
}

// ✅ Good - Color + icon/text
function StatusBadge({ status }: { status: "success" | "error" }) {
  return (
    <span
      className={status === "success" ? "text-green" : "text-red"}
      aria-label={`Status: ${status}`}
    >
      {status === "success" ? "✓" : "✗"} {status}
    </span>
  );
}
```

## Focus Indicators

### Visible Focus Styles

```typescript
// CSS
*:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

// Custom focus ring component
function FocusableButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  )
}
```

## Testing Accessibility

### Automated Testing

```typescript
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("should have no accessibility violations", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] Navigate using only keyboard (Tab, Enter, Space, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast ratios
- [ ] Verify all images have alt text
- [ ] Ensure form labels are properly associated
- [ ] Test focus management in modals
- [ ] Verify ARIA attributes are correct

## Accessibility in My Portfolio

I've implemented comprehensive accessibility features in my [portfolio website](https://www.debmalya.in/):

- Semantic HTML throughout
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader support
- Sufficient color contrast
- Accessible forms

## Tools and Resources

- **axe DevTools** - Browser extension for accessibility testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Includes accessibility audits
- **Screen Readers** - NVDA (Windows), JAWS, VoiceOver (Mac/iOS)
- **WCAG Guidelines** - Web Content Accessibility Guidelines

## Conclusion

Building accessible web applications is not optional—it's essential. By following these practices, you can create inclusive experiences that work for everyone.

Start by implementing semantic HTML, proper ARIA attributes, and keyboard navigation. Then test with screen readers and accessibility tools. Remember: accessibility is an ongoing process, not a one-time task.

---

**About the Author:** Debmalya Biswas is a Frontend & Full Stack Engineer at SaffronStays, specializing in React, Next.js, and accessible web development. He's committed to building inclusive digital experiences. Visit his [portfolio](https://www.debmalya.in/) to see accessibility best practices in action, or connect with him on [GitHub](https://github.com/AnTIdoTe003) and [LinkedIn](https://www.linkedin.com/in/debmalya-biswas-340655209).

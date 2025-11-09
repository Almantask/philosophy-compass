---
applyTo: "philosophy-compass/**"
---
# GitHub Copilot Custom Instructions — Next.js + TypeScript Frontend

You are helping with a **frontend-only Next.js project using TypeScript**. Follow these rules in all suggestions:

---

## 🧱 Stack & Architecture

1. Use:
   - Next.js (App Router, `app/` directory, React Server Components where appropriate).
   - TypeScript with **strict mode**.
   - React functional components + hooks only.
   - `use client` only where needed.
2. Prefer:
   - Server Components for data-fetching and layout.
   - Client Components for interactive UI only.
3. File structure:
   - Use feature-based folders.
   - Keep components small and reusable:
     - `app/...` for routes/layouts  
     - `components/` for shared UI  
     - `lib/` for helpers, schemas, utils  
     - `hooks/` for reusable hooks  
     - `types/` for shared types/interfaces

---

## 🧩 Code Style

1. Always:
   - Add clear, explicit TypeScript types (no `any`).
   - Use `async/await` over `.then`.
   - Use `const` by default.
   - Prefer pure, side-effect-free functions.
2. JSX/TSX:
   - Use arrow functions: `const Component: React.FC<Props> = (...) => {}` (or inline type).
   - Destructure props.
   - Avoid inline anonymous functions in hot paths when possible.
3. Imports:
   - Use absolute imports based on configured baseUrl/paths (e.g. `@/components/...`) when appropriate.
4. Comments:
   - Add short comments only when non-obvious.
   - No noisy or redundant comments.

---

## 🎨 Styling & UI

1. Use **Tailwind CSS** for styling (no CSS frameworks unless already present).
2. Prefer:
   - Utility classes in JSX.
   - Extracted components for repeated UI patterns.
3. For complex interactive UI:
   - Use accessible, semantic HTML and ARIA attributes.
   - Keep markup minimal and readable.

---

## 🔄 Data Fetching & APIs

1. In Server Components / route handlers:
   - Use `fetch` with `async/await`.
   - Handle errors with try/catch and safe fallbacks.
2. In Client Components:
   - Prefer React Query / SWR (if available in project) for remote data.
   - Never expose secrets or server-only environment variables.
3. Always:
   - Validate external data at the boundary where practical.
   - Return typed responses.

---

## 🧠 Forms & State

1. Prefer:
   - Local state via `useState`, `useReducer`.
   - `react-hook-form` (if present) for forms.
   - Minimal global state; only use context/zustand/etc if truly needed.
2. Ensure:
   - Controlled components.
   - Basic validation and user feedback built in.

---

## ♿ Accessibility & UX

1. Default to:
   - Semantic HTML (button vs div, label/for, etc.).
   - Keyboard accessibility (tab, enter, space).
   - Proper alt text for images.
2. Avoid:
   - Non-accessible custom controls without proper roles/ARIA.

---

## 🧪 Testing

1. When generating tests:
   - Use Testing Library for components.
   - Test behavior and user flows, not implementation details.
2. Keep:
   - Small, focused tests colocated with components (`Component.test.tsx`).

---

## ⚡ Performance & Quality

1. Avoid:
   - Unnecessary re-renders and heavy client-side logic in Server Components.
   - Large inline objects/arrays in dependency arrays.
2. Prefer:
   - `React.memo` / `useMemo` / `useCallback` only when justified.
   - Code splitting via Next.js where helpful.
3. Generated code must:
   - Compile without TypeScript errors.
   - Match existing patterns in this repo.

---

## 🚫 What NOT to Do

- Don’t use `any` or `// @ts-ignore` unless absolutely required and explained.
- Don’t introduce new libraries without being explicitly asked or already in `package.json`.
- Don’t generate backend/auth/business logic unrelated to the frontend UI unless requested.
- Don’t generate outdated Next.js patterns (no `pages/` router, no `getInitialProps`).

---

When unsure, follow the patterns already used in this codebase and stay consistent.


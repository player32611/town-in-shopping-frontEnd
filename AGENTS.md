# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->

## Next.js Version Warning

This project uses Next.js 16.x which has breaking changes from earlier versions. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Technology Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **React**: 19.2.4
- **UI Library**: Ant Design 6.x with @ant-design/nextjs-registry
- **Styling**: Tailwind CSS 4.x + SCSS
- **State Management**: Zustand 5.x
- **HTTP Client**: Axios
- **Language**: TypeScript 5.x

## Project Structure

```
app/            # Next.js App Router pages (home, cart, productDetail, search, productManage, accountManage)
components/
├── commen/     # Shared/reusable components (note: directory is intentionally spelled "commen")
└── ui/         # Page-specific UI components
services/       # API service functions, one file per domain (user, product, cart, comment)
store/          # Zustand state stores
types/          # TypeScript type definitions
lib/            # Utilities: Axios instance (axios.ts) and SSR-safe localStorage wrapper (storage.ts)
```

## Architecture Patterns

### Client-Side Rendering

All pages use `"use client"` directive. The app relies on client-side data fetching rather than Next.js server components.

### API Layer Pattern

API calls are centralized in `services/` directory:

- Each service file corresponds to a domain (user, product, cart, comment)
- Functions use query parameters for data transfer (not request body)
- Base URL configured via `NEXT_PUBLIC_API_URL` env var (defaults to `http://localhost:8080`)

### Authentication Flow

- JWT token stored in localStorage under key `"token"`
- Token attached to requests via Axios interceptor
- User info (id, roleId, balance) stored in localStorage
- Role-based access: 1=Admin, 2=Merchant, 3=Normal User

### State Management

- **Zustand** for global state (only `messageStore` currently)
- Local component state with `useState` for page data
- Message notifications centralized via `messageStore` for consistent UX

### Styling Approach

- **Ant Design** components as primary UI library
- **SCSS** for component-specific styles (`.scss` files alongside components)
- **Tailwind CSS** available but minimally used
- Global reset in `app/global.scss`

## Important Configuration

### next.config.ts

- Images: Configured to allow all remote hostnames (http/https)

### eslint.config.mjs

- Uses `eslint-config-next` with TypeScript and core-web-vitals rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Business Domain

- User roles: `1`=Admin, `2`=Merchant, `3`=Normal User
- UI text is in Chinese

## Notes

- All API endpoints expect query parameters, not JSON body
- No test framework is currently configured

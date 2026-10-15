# Cinema Admin — Client

The **React 19 + TypeScript** frontend for the Cinema Admin System. Covers two distinct portals running in the same SPA:

- **Admin portal** (`/admin`) — authenticated cinema staff manage movies, screen schedules, venues, bookings, and view revenue reports.
- **Customer booking flow** (`/booking`) — authenticated customers browse movies, pick showtimes, select seats, and complete bookings.

The client communicates with the Express API at `http://localhost:5000`. See `../server/README.md` for backend setup.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Setup and Scripts](#setup-and-scripts)
4. [Environment and API Base URL](#environment-and-api-base-url)
5. [Route Map](#route-map)
6. [Admin Portal](#admin-portal)
7. [Customer Booking Flow](#customer-booking-flow)
8. [Architecture](#architecture)
9. [Zustand Stores](#zustand-stores)
10. [Authentication](#authentication)
11. [Theming System](#theming-system)
12. [Project Structure](#project-structure)
13. [Production Build](#production-build)
14. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| UI framework | React | 19 |
| Language | TypeScript | ~6.x, strict mode |
| Bundler | Vite | 8 |
| Routing | React Router | 7 |
| Styling | Tailwind CSS | 4 (`@tailwindcss/vite`) |
| Charts | Recharts | 3 |
| State | Zustand | 5 (`persist` middleware) |

**Import alias:** `@/*` → `src/*` (configured in `vite.config.ts` and `tsconfig.app.json`).

---

## Prerequisites

- **Node.js** 20 or newer
- **npm** (bundled with Node)
- The Express API server running at `http://localhost:5000` — see `../server/README.md`

---

## Setup and Scripts

```bash
cd client
npm install
```

| Script | What it does |
|--------|-------------|
| `npm run dev` | Vite dev server at `http://localhost:5173` (HMR enabled) |
| `npm run build` | TypeScript check then production output to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint with flat config (`eslint.config.js`) |

---

## Environment and API Base URL

The API base URL defaults to `http://localhost:5000` and is hardcoded in two API helper files:

| File | Used by |
|------|---------|
| `src/lib/api.ts` | Admin portal stores |
| `src/lib/customerApi.ts` | Customer booking flow |

To point at a different API host, update the base URL constants in those two files (or replace them with `import.meta.env.VITE_API_URL`).

---

## Route Map

```
/                               LandingPage
/login                          UserLoginPage      (→ /booking/movies if already authed)
/admin/login                    LoginPage          (→ /admin/ if already authed)
/admin/                         DashboardPage      ─┐
/admin/movies                   MovieManagementPage  │ AdminProtectedRoute
/admin/screens                  ScreenManagementPage │ (→ /admin/login if not authed)
/admin/venues                   VenueManagementPage  │
/admin/booking                  BookingPage          │
/admin/reports                  ReportsPage        ─┘
/booking                        CustomerBookingLayout ─┐
/booking/movies                 CustomerMoviePick      │ CustomerProtectedRoute
/booking/movies/:showId/…       CustomerShowtimePick   │ (→ /login if not authed)
/booking/showings/:id/seats     CustomerSeatSelection  │
/booking/checkout               CustomerCheckoutPage   │
/booking/checkout/:bookingId    CustomerCheckoutPage ──┘
*                               NotFound (404)
```

---

## Admin Portal

All admin routes live under `/admin` and require a valid admin JWT. `AdminPageLayout` provides the persistent sidebar (`NavSidebar`) and top bar (`Topbar`) via React Router's `<Outlet>`.

### Pages

| Route | Store | Description |
|-------|-------|-------------|
| `/admin/` | `useDashboardStore` | 4 live stat cards, 7-day booking trend chart, today's upcoming showings table |
| `/admin/movies` | `useMovieStore` | Card grid — add, edit, delete movies. Delete is blocked server-side if showings exist. |
| `/admin/screens` | `useShowingStore` + `useMovieStore` | Hourly timeline grid per venue + showtime table. Create showing triggers auto-seat population. |
| `/admin/venues` | `useVenueStore` | Venue list with seat counts. Click a venue to manage its seat assignments. |
| `/admin/booking` | `useBookingStore` | Paginated booking list with search, status/date filters, and a Cancel action. |
| `/admin/reports` | local `useState` | Period selector (week/month/year) + revenue charts (area + bar) + stat cards. No global store — read-only aggregates. |

---

## Customer Booking Flow

Public-facing booking lives under `/booking` and requires a customer JWT. The layout component is `CustomerBookingLayout`.

### Flow

```
Landing (/)
  └─→ Customer Login (/login)
        └─→ Movie Picker (/booking/movies)
              └─→ Showtime Picker (/booking/movies/:showId/showtimes)
                    └─→ Seat Selection (/booking/showings/:showingId/seats)
                          └─→ Checkout (/booking/checkout)
                                └─→ Confirmation (/booking/checkout/:bookingId)
```

| Page | API calls | Description |
|------|-----------|-------------|
| `CustomerMoviePick` | `GET /api/movies` | Browse movies sorted by availability |
| `CustomerShowtimePick` | `GET /api/showings?show_id=` | Available showtimes for a movie |
| `CustomerSeatSelection` | `GET /api/customer/showings/:id/seats` | Interactive seat map; Free / Reserved / Confirmed |
| `CustomerCheckoutPage` | `POST /api/customer/bookings`, `POST .../checkout`, `POST .../complete` | Create booking → checkout → complete |

All customer API requests use `customerApi` (`src/lib/customerApi.ts`) which attaches the customer JWT from the `useCustomerAuth` store.

---

## Architecture

### State flow

```
Page component
  → Zustand store action (e.g. fetchMovies())
    → api.ts / customerApi.ts (typed fetch wrapper, attaches JWT)
      → Express API (:5000)
        → MySQL
```

### API helpers

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | Admin API calls — reads token from `useAuthStore`; on 401 redirects to `/admin/login` |
| `src/lib/customerApi.ts` | Customer API calls — reads token from `useCustomerAuthStore`; on 401 redirects to `/login` |

---

## Zustand Stores

| Store | Persisted | State |
|-------|-----------|-------|
| `useAuth` | Yes (`cinema-admin-auth`) | `{ authed, token }` |
| `useCustomerAuth` | Yes (`cinema-customer-auth`) | `{ authed, token, user }` |
| `useMovieStore` | No | `{ movies, loading, error }` |
| `useShowingStore` | No | `{ showings, venues, loading, error }` |
| `useBookingStore` | No | `{ bookings, loading, error }` |
| `useDashboardStore` | No | `{ stats, trend, upcoming, loading }` |
| `useVenueStore` | No | `{ venues, seats, selectedVenueId, loading, error }` |

All persisted stores use Zustand's `persist` middleware with `localStorage`.

---

## Authentication

### Admin

- Login: `POST /api/auth/login` — server validates email + password, checks `role = 'Admin'`, returns a signed JWT (8-hour expiry).
- Token stored in `localStorage` via `useAuthStore`.
- Every admin API request sends `Authorization: Bearer <token>`.
- 401 response → store is cleared and the user is redirected to `/admin/login`.

### Customer

- Login: `POST /api/auth/customer/login` — same JWT mechanism, `role = 'Customer'`.
- Token stored in `localStorage` via `useCustomerAuthStore`.
- Customer-scoped API calls go through `customerApi.ts`.
- 401 response → redirect to `/login`.

**Demo credentials:**

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@cinema.com` | `Admin@1234` |
| Customer | `john@example.com` | `User@1234` |

---

## Theming System

`AdminPageLayout` sets `data-admin-theme="light"` or `"dark"` on the content wrapper based on the current route:

| Theme | Routes |
|-------|--------|
| `light` | Dashboard, Reports |
| `dark` | Movies, Screens, Venues, Booking |

All component colors are CSS custom property tokens (e.g. `var(--color-surface)`). No hardcoded hex values in components. The single source of truth for all tokens is `src/index.css`.

`UrlPathConfig.ts` holds `ADMIN_PATH_CONFIG` — the single source of truth for route paths, nav labels, icon assets, and per-route color sets. Both `NavSidebar` and `Topbar` read from this config.

---

## Project Structure

```
client/
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── vercel.json                   # SPA fallback rewrite for Vercel
└── src/
    ├── main.tsx                  # Entry: StrictMode + BrowserRouter + App
    ├── App.tsx                   # All routes + auth guard components
    ├── index.css                 # ALL color tokens (var(--color-*))
    ├── lib/
    │   ├── api.ts                # Admin typed fetch wrapper
    │   ├── customerApi.ts        # Customer typed fetch wrapper
    │   ├── customerBookingUi.ts  # Movie availability helpers
    │   └── seatRowGrouping.ts    # Seat layout helpers
    ├── assets/
    │   ├── hero.png
    │   ├── login_bg.png
    │   ├── tempMoviePoster.jpg   # Fallback poster image
    │   └── navbar/               # dashboard.png, movie.png, …
    ├── components/
    │   ├── AdminPageLayout.tsx   # Shell: NavSidebar + Topbar + <Outlet>
    │   ├── NavSidebar.tsx
    │   ├── Topbar.tsx
    │   ├── LoginShell.tsx        # Shared login form used by both portals
    │   ├── UrlPathConfig.ts      # ADMIN_PATH_CONFIG, route/color/icon config
    │   └── editModal/
    │       ├── MovieFormModal.tsx
    │       └── ScreenFormModal.tsx
    ├── pages/
    │   ├── LandingPage.tsx
    │   ├── Login.tsx             # Admin login
    │   ├── UserLogin.tsx         # Customer login
    │   ├── Dashboard.tsx
    │   ├── MovieManagement.tsx
    │   ├── ScreenManagement.tsx
    │   ├── VenueManagement.tsx
    │   ├── Booking.tsx
    │   ├── Report.tsx
    │   ├── NotFound.tsx
    │   └── customer/
    │       ├── CustomerBookingLayout.tsx
    │       ├── CustomerMoviePick.tsx
    │       ├── CustomerShowtimePick.tsx
    │       ├── CustomerSeatSelection.tsx
    │       └── CustomerCheckoutPage.tsx
    └── store/
        ├── useAuth.ts
        ├── useCustomerAuth.ts
        ├── useMovieStore.ts
        ├── useShowingStore.ts
        ├── useBookingStore.ts
        ├── useDashboardStore.ts
        └── useVenueStore.ts
```

---

## Production Build

```bash
npm run build
```

Output: `dist/` — static HTML/JS/CSS.

The app uses `BrowserRouter`, so the host must serve `index.html` for all unknown paths (SPA fallback). `vercel.json` includes a catch-all rewrite suitable for Vercel.

For other hosts, configure the equivalent:
- **Nginx:** `try_files $uri /index.html`
- **Apache:** `FallbackResource /index.html`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page / 404 on refresh at `/admin/movies` | Enable SPA history fallback on your host (see Production Build) |
| "Failed to fetch" on login | Ensure the API server is running on `:5000` and CORS allows `:5173` |
| Missing poster images | The server serves uploaded posters via Cloudinary; check `CLOUDINARY_*` env vars in `server/.env` |
| TypeScript errors after editing | Run `npm run build` to surface `tsc -b` type errors |
| Wrong or missing sidebar icon | Ensure `src/assets/navbar/<name>.png` exists and matches `iconPath("<name>")` in `UrlPathConfig.ts` |

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.

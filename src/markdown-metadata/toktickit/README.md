# TokTickIT

An IT service desk for CPE334, delivered as of Lab 3. Users sign in with an email address and password, must change an initial password at first login, and see only the navigation and actions their role permits:

- **Requester:** creates and manages their own Tickets and Attachments, posts Public Comments, and can indicate that a problem appears resolved.
- **IT Staff:** works a shared Ticket Queue with search, filters, sorting, and pagination, then claims or reassigns Tickets, sets IT Priority, moves Tickets through the approved status workflow, and writes Public Comments and Internal Notes.
- **Administrator:** manages user accounts in one minimalist User Management screen and has a read-only Ticket Review.

Every protected operation is enforced by the backend; hidden UI controls are feedback only. The interface follows the Zen Green design system across desktop, tablet, and mobile.

- **Stack:** React + TypeScript + Vite + Bootstrap → Express + TypeScript → Prisma ORM → PostgreSQL
- **Tests:** Vitest (unit/UI) + Supertest (API) + Playwright (E2E/responsive/accessibility)

## Prerequisites

- **Node.js** 18 or newer — developed on v24.13.1
- **PostgreSQL** 16 or newer, running on `localhost:5432` — developed on 18

## Setup

Every command below is written to be run from the repository root, so return there between steps.

### 1. Clone and install

```bash
git clone https://github.com/jakkarin-promsee/toktickit.git
cd toktickit
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Create the database

Connect as a PostgreSQL superuser and create the role and database the app expects:

```sql
CREATE USER toktickit WITH PASSWORD 'toktickit';
CREATE DATABASE toktickit OWNER toktickit;
ALTER ROLE toktickit CREATEDB;
```

With `psql`, run the three statements one after another:

```bash
psql -U postgres -c "CREATE USER toktickit WITH PASSWORD 'toktickit';"
psql -U postgres -c "CREATE DATABASE toktickit OWNER toktickit;"
psql -U postgres -c "ALTER ROLE toktickit CREATEDB;"
```

> `CREATEDB` is required by `prisma migrate dev` (step 4). Before applying a migration it replays
> the whole `prisma/migrations/` history into a throwaway *shadow database* to detect drift between
> the migration files and `schema.prisma`, then drops it. Without the grant the migration fails with
> `P3014 — permission denied to create database`. Owning the `toktickit` database is not enough:
> creating a database is a separate role attribute.
>
> On Windows `psql` may not be on your `PATH`; it ships at
> `C:\Program Files\PostgreSQL\<version>\bin\psql.exe`.
>
> If you run these in the pgAdmin Query Tool, execute them **one at a time** — `CREATE DATABASE`
> cannot run inside a transaction block, and pgAdmin wraps a multi-statement execution in one.

### 3. Configure environment variables

Both sides ship a `.env.example`. Copy each to `.env` and adjust if your local values differ:

```bash
cd server && cp .env.example .env     # DATABASE_URL, LAB3_SEED_INITIAL_PASSWORD, PORT
cd ../client && cp .env.example .env  # VITE_API_URL
cd ..
```

On PowerShell, use `Copy-Item .env.example .env` instead.

Real `.env` files are git-ignored and must never be committed.

Set `LAB3_SEED_INITIAL_PASSWORD` in `server/.env` to a local-only value containing 12–128 characters with at least one lowercase letter, uppercase letter, digit, and symbol. See [`docs/lab-03/seed-credentials.md`](docs/lab-03/seed-credentials.md) for the seeded account list and credential safety rules.

### 4. Apply migrations and seed

```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

The seed is idempotent: repeated runs do not duplicate Categories, Related Systems, Users, Credentials, Tickets, Public Comments, or Internal Notes, and existing credential hashes are not rotated.

### 5. Run both sides

Use two terminals:

```bash
cd server && npm run dev   # API  → http://localhost:3000
```

```bash
cd client && npm run dev   # web  → http://localhost:5173
```

Open http://localhost:5173 and sign in with a seeded account from [`docs/lab-03/seed-credentials.md`](docs/lab-03/seed-credentials.md), using the `LAB3_SEED_INITIAL_PASSWORD` value from `server/.env`. Every seeded account starts with a mandatory password change, so the first sign-in opens Change Password before the role home page. Inactive seeded accounts cannot sign in by design.

The API sets an HttpOnly session cookie and expects every state-changing request from the configured client origin (`CLIENT_ORIGIN`, default `http://localhost:5173`) with the `X-CSRF-Token` returned by sign-in. Sessions expire after eight hours and end immediately on logout, password change, deactivation, role change, or an Administrator password reset.

## Tests

```bash
npm run test:server         # Vitest + Supertest: contract, unit, migration, API, security, regression
npm run test:client         # Vitest + Testing Library: UI component and style tests
npm run test:lab3           # Server then client suites
npm run test:lab3:rerun     # Server and client suites twice in a row
npm run test:e2e            # Playwright: E2E, responsive, and accessibility (skips @visual)
npm run test:e2e:rerun      # Playwright suite twice in a row
npm run test:visual         # Screenshot evidence into artifacts/lab-03/screenshots/ on a fresh seed
```

Server tests reset and seed the isolated PostgreSQL schema `lab2_test`. Playwright resets and seeds `lab3_e2e`, generates a synthetic per-run seed password, uses temporary Attachment storage under `.tmp/`, and starts isolated services on ports 3100 and 5174. Development data in the default `public` schema is not changed. Override the defaults with `TEST_DATABASE_URL`, `PLAYWRIGHT_DATABASE_URL`, or `PLAYWRIGHT_ATTACHMENT_STORAGE`.

Install the browser once with `npx playwright install chromium`. On this Windows workstation Playwright may use the installed Chrome executable; CI should install Chromium or set `PLAYWRIGHT_EXECUTABLE_PATH`.

Test files live under `server/tests/`, `client/tests/`, and `e2e/lab-03/`. Results and traceability are recorded in `docs/lab-03/tests.md`.

## API

The complete contract, including request and response shapes, status codes, and safe error behavior, is in [`docs/lab-03/api-spec.md`](docs/lab-03/api-spec.md). Endpoint families:

| Area | Endpoints | Allowed role |
| --- | --- | --- |
| Health and reference data | `GET /api/health`, `GET /api/categories`, `GET /api/related-systems` | Public |
| Authentication | `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/change-password` | Any active user |
| Requester Tickets | `POST/GET /api/tickets`, `GET /api/tickets/:ticketId`, `POST /api/tickets/:ticketId/problem-appears-resolved` | Requester (own Tickets only) |
| Attachments | `POST/GET /api/tickets/:ticketId/attachments`, `GET /api/attachments/:attachmentId/download`, `DELETE /api/attachments/:attachmentId` | Requester owns the lifecycle; IT Staff and Administrator can download |
| Public Comments | `GET/POST /api/tickets/:ticketId/comments` | Owning Requester and IT Staff post; Administrator reads |
| Staff Ticket operations | `GET /api/staff/tickets`, `GET /api/staff/tickets/:ticketId`, `GET /api/staff/assignees`, `POST .../claim`, `PATCH .../owner`, `PATCH .../it-priority`, `PATCH .../status` | IT Staff; Administrator has read-only Queue and Detail |
| Internal Notes | `GET/POST /api/staff/tickets/:ticketId/internal-notes` | IT Staff; Administrator reads; Requester always `403` |
| User Management | `GET/POST /api/admin/users`, `PATCH /api/admin/users/:userId`, `POST /api/admin/users/:userId/initial-password` | Administrator |

`/api/health` is a liveness probe and never queries the database, so it stays `200` even while PostgreSQL is down.

## Project structure

```
toktickit/
├── client/                 React + TypeScript + Vite frontend
│   ├── src/                screens, shared Zen Green UI components, styles
│   └── tests/lab-03/       UI component, accessibility helper, and style tests
├── server/                 Express + TypeScript API
│   ├── prisma/             schema, migrations, idempotent seed
│   ├── src/
│   └── tests/              lab-01/, lab-02/ (regression), lab-03/
├── e2e/lab-03/             Playwright E2E, responsive, accessibility, and visual evidence
├── docs/
│   ├── lab-01/             tests.md · reviewer.md · ai_use.md
│   ├── lab-02/             contract, test plan, reviewer record, AI use
│   └── lab-03/             specification · tests · ui-spec · api-spec · reviewer · ai-use
├── artifacts/
│   ├── lab-02/screenshots/ Lab 2 visual evidence
│   └── lab-03/screenshots/ authentication · requester · staff-queue · staff-ticket-detail · user-management · before-after
├── playwright.config.ts
├── .gitignore
└── README.md
```

## Security notes and limitations

- Passwords are stored only as Argon2id hashes; session tokens are stored as SHA-256 hashes; neither is ever returned by the API.
- Seeded credentials are for local development only. Never commit `server/.env`, a real password, or a token.
- The failed-login limiter (five failures per email and IP in fifteen minutes) is in-memory and resets when the server restarts.
- The session cookie omits the `Secure` flag only on local HTTP; any HTTPS deployment must set it and configure the exact `CLIENT_ORIGIN`.
- Prisma migrations are forward-only; recovering from a failed upgrade means restoring a database backup taken before `prisma migrate deploy`.

## Git workflow

Each Lab 3 Issue was implemented on its own `feature/<issue>-*` branch and merged into `lab3-staging` through a peer-reviewed PR: Issues #30–#40 entered staging through PRs #42–#52, and the release check's fix went through PR #53. Issue #41 released `lab3-staging` to `main` through reviewed release PR #54. No feature development happens directly on `main` or `lab3-staging`. Review evidence is recorded in [`docs/lab-03/reviewer.md`](docs/lab-03/reviewer.md).

Lab 2 followed the same pattern: feature branches `feature/10-*` through `feature/17-*` targeted `lab2-staging`, and Issue #18 released it to `main` via PR #27.

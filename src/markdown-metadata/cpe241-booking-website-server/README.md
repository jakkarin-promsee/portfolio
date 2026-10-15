# Cinema Admin — Server

The **Express 5 + Node.js** API for the Cinema Admin System. Serves both the admin portal and the customer booking flow over a MySQL database.

- **Base URL:** `http://localhost:5000/api`
- **Database:** MySQL — `CPE241_final_project`
- **Auth:** JWT (8-hour expiry, `Authorization: Bearer <token>`)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Scripts](#scripts)
7. [Project Structure](#project-structure)
8. [API Reference](#api-reference)
9. [Database Schema](#database-schema)
10. [Business Logic](#business-logic)
11. [Performance Indexes](#performance-indexes)
12. [Seed Data](#seed-data)

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2 | HTTP framework |
| mysql2 | ^3.22 | MySQL driver (Promise API, connection pool) |
| jsonwebtoken | ^9.0 | JWT sign/verify |
| bcryptjs | ^2.4 | Password hashing |
| cors | ^2.8 | Cross-origin requests |
| dotenv | ^17 | Environment variable loading |
| nodemon | ^3.1 | Dev runner (watches `src/` and `.env`) |

Module system: CommonJS (`"type": "commonjs"`).

---

## Prerequisites

- **Node.js** 20+
- **MySQL** 8.0+ running locally (default port 3306)

---

## Setup

```bash
cd server
npm install
cp .env.example .env   # then fill in your credentials (see Environment Variables)
```

---

## Environment Variables

Create `server/.env`:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=CPE241_final_project
PORT=5000
JWT_SECRET=cinema-admin-secret-change-in-prod
```

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `MYSQL_HOST` | Yes | — | MySQL host |
| `MYSQL_PORT` | Yes | — | MySQL port |
| `MYSQL_USER` | Yes | — | MySQL user |
| `MYSQL_PASSWORD` | Yes | — | MySQL password |
| `MYSQL_DATABASE` | Yes | — | Database name |
| `PORT` | Yes | 3000 | Must be `5000` to match the client |
| `JWT_SECRET` | Yes | — | Server logs a warning on startup if missing |

---

## Database Setup

Run these scripts once, in order:

```bash
npm run db:create   # creates CPE241_final_project (no tables)
npm run db:schema   # drops and recreates all 9 tables + indexes (re-runnable)
npm run db:seed     # hashes passwords and inserts demo data (re-runnable)
```

---

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `nodemon` | Dev server; restarts on `src/` or `.env` change |
| `start` | `node src/app.js` | Production start |
| `db:create` | `node scripts/001_create_database.js` | Create the database |
| `db:schema` | `node scripts/002_schema.js` | Run schema SQL (safe to re-run) |
| `db:seed` | `node scripts/003_seed.js` | Run seed SQL (safe to re-run) |

---

## Project Structure

```
server/
├── src/
│   ├── app.js                    # Express app: cors → json → routes → notFound → errorHandler
│   ├── config/
│   │   └── env.js                # dotenv.config() — must be the first require
│   ├── db/
│   │   └── pool.js               # mysql2/promise pool (dateStrings, decimalNumbers)
│   ├── middleware/
│   │   ├── auth.middleware.js    # requireAuth, requireAdmin, requireCustomer
│   │   └── error.middleware.js   # notFound (404) and errorHandler (500/4xx)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── models/
└── scripts/
    ├── 001_create_database.js / .sql
    ├── 002_schema.js / .sql      # all 9 tables + 5 indexes
    └── 003_seed.js / .sql        # demo data with hashed passwords
```

Every feature follows the same four-layer chain:

```
routes/*.routes.js
  → controllers/*.controller.js   (parse req, call service, send res)
    → services/*.service.js       (business logic and validation)
      → models/*.model.js         (SQL queries only)
        → db/pool.js
```

---

## API Reference

All routes are under `/api`. Endpoints marked 🔒Admin require a JWT with `role = 'Admin'`. Endpoints marked 🔒Customer require a JWT with `role = 'Customer'`.

### Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | open | MySQL version + host + database |

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | open | `{ email, password }` → `{ token, user }` (Admin role only) |
| POST | `/auth/customer/login` | open | `{ email, password }` → `{ token, user }` (Customer role only) |

### Movies

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/movies` | open | List movies; `?search=` `?status=` |
| POST | `/movies` | 🔒Admin | Create movie |
| PUT | `/movies/:id` | 🔒Admin | Update movie |
| DELETE | `/movies/:id` | 🔒Admin | Delete movie (409 if showings exist) |

### Venues

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/venues` | open | List venues with seat counts |
| POST | `/venues` | 🔒Admin | Create venue |
| PUT | `/venues/:id` | 🔒Admin | Update venue |
| DELETE | `/venues/:id` | 🔒Admin | Delete venue |
| GET | `/venues/:id/seats` | open | List seat numbers in a venue |
| POST | `/venues/:id/seats` | 🔒Admin | Assign seat number strings |
| DELETE | `/venues/:id/seats/:seatId` | 🔒Admin | Remove a seat from a venue |

### Showings

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/showings` | open | List showings; `?venueId=` `?date=`; includes movie title, venue name, sold/capacity |
| POST | `/showings` | 🔒Admin | Create showing + auto-populate `reserved_seats` (atomic transaction, FOR UPDATE overlap check) |
| PUT | `/showings/:id` | 🔒Admin | Update showing (overlap check) |
| DELETE | `/showings/:id` | 🔒Admin | Delete showing (409 if bookings exist) |

### Bookings (Admin)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/bookings` | 🔒Admin | List bookings; `?search=` `?status=` `?dateFrom=` `?dateTo=` `?page=` `?limit=` (max 200) |
| PUT | `/bookings/:id/cancel` | 🔒Admin | Cancel booking (transaction: reserved_seats → Free + booking → Cancel) |

### Customer

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/customer/showings/:showingId/seats` | 🔒Customer | Available seat map for a screening |
| POST | `/customer/bookings` | 🔒Customer | Create booking (reserves seats) |
| GET | `/customer/bookings/latest` | 🔒Customer | Latest booking for the current customer |
| GET | `/customer/bookings/:id` | 🔒Customer | Booking detail |
| POST | `/customer/bookings/:id/checkout` | 🔒Customer | Advance booking to Checkout status |
| POST | `/customer/bookings/:id/complete` | 🔒Customer | Complete payment (→ Successful) |

### Dashboard

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/dashboard/stats` | 🔒Admin | Active movies + screens online today + today's bookings + today's revenue |
| GET | `/dashboard/trend` | 🔒Admin | Booking count per day, last 7 days (CTE zero-filled) |
| GET | `/dashboard/upcoming` | 🔒Admin | Today's showings with sold/capacity |

### Reports

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reports/stats` | 🔒Admin | `?period=weekly\|monthly\|yearly` → revenue + top movie + occupancy % |
| GET | `/reports/revenue/daily` | 🔒Admin | `?period=` → daily revenue (CTE zero-filled) |
| GET | `/reports/revenue/monthly` | 🔒Admin | Monthly revenue for last 12 months (CTE zero-filled) |
| GET | `/reports/breakdown` | 🔒Admin | `?period=` `?groupBy=date\|movie\|venue` `?metric=sales\|occupancy` |

---

## Database Schema

### Tables

| Table | PK | Purpose |
|-------|----|---------|
| `users_profile` | `user_id` | Accounts for both admins and customers. `role` ENUM(`Customer`, `Admin`). `password` is a bcrypt hash. |
| `venues` | `venues_id` | Physical cinema halls |
| `seats` | `seat_id` | Individual seat labels (e.g. `A1`, `B5`) |
| `showtimes` | `show_id` | Movie catalog (table is named `showtimes` but stores movies) |
| `contain_seats` | `(venues_id, seat_id)` | Seating plan: which seats exist in which venue |
| `showing` | `showing_id` | Screening schedule: movie + venue + date + time |
| `reserved_seats` | `(showing_id, seat_id)` | Seat status per screening: `Free`, `Reserved`, `Confirmed` |
| `booking` | `booking_id` | Booking transaction: customer + showing + status |
| `booking_items` | `(booking_id, seat_id)` | Individual seats within a booking |

### Key constraints

| Constraint | Detail |
|-----------|--------|
| `showing` UNIQUE | `(venues_id, showtime_date, start_time)` — one show per hall per timeslot |
| `reserved_seats` PK | `(showing_id, seat_id)` — seat status is per screening |
| `booking_items` PK | `(booking_id, seat_id)` — same seat cannot appear twice in one booking |
| All foreign keys | `ON DELETE RESTRICT` — child rows must be removed first |

### Movie effective status

The stored `status` column is overridden by dates in every query:

```sql
CASE
  WHEN status IN ('Hidden', 'Ended') THEN status
  WHEN end_date IS NOT NULL AND CURDATE() > end_date THEN 'Ended'
  WHEN release_date IS NOT NULL AND CURDATE() < release_date THEN 'Upcoming'
  WHEN status = 'Open' THEN 'Open'
  ELSE 'Upcoming'
END
```

### Booking status flow

```
Booking → Checkout → Successful
                   ↘ Cancel (admin action)
```

---

## Business Logic

### Auto-populate seats on showing create

When a new showing is created, the server wraps three operations in one transaction:

1. `SELECT … FOR UPDATE` on `showing` — overlap check (prevents two concurrent inserts for the same hall/time).
2. `INSERT INTO showing` — the new screening row.
3. `INSERT INTO reserved_seats SELECT … FROM contain_seats` — one row per seat in that venue, all `status = 'Free'`.

If any step fails the transaction rolls back completely.

### Cancel booking transaction

```sql
BEGIN;
  UPDATE reserved_seats SET status = 'Free'
    WHERE showing_id = ? AND seat_id IN (SELECT seat_id FROM booking_items WHERE booking_id = ?);
  UPDATE booking SET status = 'Cancel' WHERE booking_id = ?;
COMMIT;
```

Both updates succeed together or neither does.

### CTE zero-fill for charts

Trend and revenue queries use recursive CTEs to generate a complete date/month range, then LEFT JOIN actual data so days with no activity appear as `0` rather than being missing from the chart.

---

## Performance Indexes

Five indexes added in `002_schema.sql`:

| Index | Table | Columns | Used by |
|-------|-------|---------|---------|
| `idx_booking_date` | `booking` | `(date)` | Dashboard today stats, trend chart, booking list |
| `idx_booking_status_date` | `booking` | `(status, date)` | Report revenue queries (`Successful` + date range) |
| `idx_showing_date` | `showing` | `(showtime_date)` | Dashboard upcoming, screen management filter |
| `idx_showing_venue_date` | `showing` | `(venues_id, showtime_date)` | Overlap check on every showing create/update |
| `idx_rs_showing_status` | `reserved_seats` | `(showing_id, status)` | Sold/capacity aggregation (covering index) |

---

## Seed Data

| Table | Rows | Notes |
|-------|------|-------|
| `users_profile` | 22 | 2 Admin, 20 Customer |
| `venues` | 4 | CineMax Hall A, StarPlex Hall B, MegaScreen Hall C, Galaxy Hall D |
| `seats` | 160 | Multiple layouts per venue |
| `showtimes` | 12 | Mix of Open / Upcoming / Ended |
| `showing` | 168 | Spread across multiple dates |
| `reserved_seats` | ~6 720 | 168 showings × 40 seats |
| `booking` | ~170 | Mix of all four statuses |

**Seed credentials:**

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@cinema.com` | `Admin@1234` |
| Cinema Manager | `manager@cinema.com` | `Manager@1234` |
| Customer (×20) | `john@example.com` … | `User@1234` |

---

## Notes and Gotchas

- **`pool.js` config** — `dateStrings: ['DATE']` keeps MySQL `DATE` columns as plain `YYYY-MM-DD` strings (prevents ISO datetime conversion). `decimalNumbers: true` returns `DECIMAL`/`SUM()` results as JavaScript numbers (prevents `.toFixed()` crashes).
- **`showtimes` naming** — The table stores the movie catalog, not showtimes. `showing` is the actual schedule. This naming inversion exists in the schema and is preserved for now.
- **`PORT` fallback** — `app.js` falls back to `3000` if `PORT` is unset. Always set `PORT=5000` in `.env`.
- **JWT_SECRET warning** — server logs a startup warning if `JWT_SECRET` is missing but still starts.

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.

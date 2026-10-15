# Calisthenics Course Booking — Server

## What is real in this MVP

This service is the account foundation for the calisthenics coaching prototype. It runs an Express API backed by MongoDB/Mongoose and persists accounts for users, trainers, and administrators. The public registration endpoint creates a user; login requires the requested portal (`user`, `trainer`, or `admin`) to match the account role; `/auth/me` validates a bearer JWT and returns current user information. An administrator can create trainer accounts. Blocked or suspended accounts cannot sign in. Public status routes expose server runtime, database connection, environment-variable presence, and an aggregate check.

The client prototype visualizes plans, payments, balances, booking slots, and skill progress, but this server does not implement those data models or business operations. That distinction matters: the repo demonstrates backend identity and role boundaries, not a complete coaching commerce system.

## Account lifecycle and runtime

`src/models/user.model.ts` defines name, normalized unique email, password hash, role, and status. `src/controllers/auth.controller.ts` handles registration, portal-specific login, session lookup, and trainer creation. `src/middlewares/auth.middleware.ts` validates JWTs and roles; routes keep the access contract explicit. Token expiry defaults to seven days when not configured. `src/app.ts` connects to MongoDB before listening, and `src/config/db.ts` currently fixes the database name to `Untitle`, even when the connection URI names another database.

Optional environment variables bootstrap an admin on startup. If the configured admin email already exists, the bootstrap synchronizes its name, role, and password. `ADMIN_ENFORCE_SINGLE_ADMIN=true` can demote other admins to users. This is an operationally powerful setup shortcut and needs care against a database with existing accounts. The service also exposes health endpoints that make deployment checks easy, although the README flags public status detail as a production concern.

## Boundaries and next decisions

The README names current limits: default `cors()` configuration, no rate limiting, no booking/payment persistence, and unverified serverless behavior despite a `vercel.json`. Before real customer use, it calls for stronger input validation, restricted CORS, production error handling, and a deployment model that matches its connect-then-listen startup. In the paired client, booking and payment flows are sample state, so any portfolio presentation should keep that boundary visible.

## Evidence and open questions

- Sources: `project/calisthenics-course-booking-server/README.md`, `project/calisthenics-course-booking-server/src/app.ts`, `project/calisthenics-course-booking-server/src/config/db.ts`, `project/calisthenics-course-booking-server/src/models/user.model.ts`, `project/calisthenics-course-booking-server/src/controllers/auth.controller.ts`, `project/calisthenics-course-booking-server/src/middlewares/auth.middleware.ts`, and `project/calisthenics-course-booking-server/src/utils/bootstrap-admin.ts`.
- The repo does not explain who would operate the coaching service, whether any accounts were used beyond demo, or which next backend feature had priority. Ask the owner about the original product context and intended deployment.

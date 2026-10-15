# TokTickIT

## The product and its users

TokTickIT is a CPE334 IT service desk delivered through Lab 3. It models a real support workflow rather than just a ticket form. A Requester signs in, creates and manages their own tickets and attachments, adds Public Comments, and can mark a problem as apparently resolved. IT Staff work a shared queue with search, filtering, sorting, and pagination, then claim or reassign tickets, set IT Priority, move them through an approved status matrix, and write Public Comments or staff-only Internal Notes. Administrators manage accounts in a focused screen and can review tickets without editing the support workflow. The React frontend uses a Zen Green visual system across desktop, tablet, and mobile.

## Architecture and authority

The client is React/TypeScript/Vite; the API is Express/TypeScript with Prisma and PostgreSQL. The database schema, migrations, and idempotent seed live under `server/prisma/`. Requester, staff, and admin screens live in `client/src/`; API behavior and validation live in `server/src/`. The API contract in `docs/lab-03/api-spec.md` specifies shapes and safe failures. The client hides unavailable actions for clarity, but the backend checks role and record scope for every protected endpoint. Requesters can only operate on their own tickets; Internal Notes are inaccessible to them. Staff status changes follow a backend transition matrix, even though the frontend holds a separate copy for display.

Authentication uses an HttpOnly session cookie and an `X-CSRF-Token` for state-changing requests from the configured origin. Passwords use Argon2id hashes; stored session tokens are SHA-256 hashes. Seeded accounts must change their initial password at first login. Sessions expire after eight hours and are invalidated on logout, password change, deactivation, role change, or admin reset. The README also names limits: the failed-login counter is in memory, local HTTP omits the secure cookie flag, and migration rollback depends on a backup.

## Feature depth and evidence of delivery

The system has public reference endpoints, authentication, Requester ticket and attachment lifecycles, comments, a staff queue and detail workspace, and user management. Attachments can be listed independently of embedded ticket detail so a screen can refresh them without refetching the ticket. Health is a liveness probe and deliberately does not query the database. The repo holds lab specifications, UI specs, API contracts, tests, reviewer notes, and AI-use disclosures, which together show how behavior was decided and verified.

Tests span server unit and API checks via Vitest/Supertest, client component tests via Testing Library, and Playwright flows for core roles, authorization, responsive behavior, accessibility, and screenshots. Server and E2E runs use separate PostgreSQL schemas and temporary attachment storage so tests do not modify development data. The test matrix records results rather than assuming that a file's existence means a pass.

The development process is part of the experience represented here. Lab 3 Issues #30–#40 each entered staging through a feature branch and peer-reviewed PR; the release was merged through a reviewed PR. `docs/lab-03/reviewer.md` records the PRs and review discussion, including a question about duplicate attachment representations and a note about the client status matrix mirroring the authoritative server matrix. `docs/lab-03/ai-use.md` explains how AI was used for requirements analysis, implementation, test design, audits, and review while the author retained decisions about scope, commits, and PR readiness. This is supported author involvement, not a claim that every line was written without assistance.

## Evidence and open questions

- Sources: `project/toktickit/README.md`, `project/toktickit/docs/lab-03/specification.md`, `project/toktickit/docs/lab-03/api-spec.md`, `project/toktickit/docs/lab-03/tests.md`, `project/toktickit/docs/lab-03/reviewer.md`, `project/toktickit/docs/lab-03/ai-use.md`, `project/toktickit/server/src/app.ts`, `project/toktickit/server/prisma/schema.prisma`, and `project/toktickit/e2e/lab-03/`.
- The course context and process are documented; use in an actual IT department or external impact is not. Ask the owner which ambiguous requirement or peer review changed the product most, and what part of the workflow they found hardest to design.

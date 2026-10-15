# TokTickIT

Categories: [Full-Stack Web Apps, Software Engineering, Service Desk]

Summary: A role-based IT service desk developed for CPE334 across staged lab releases. Requesters submit tickets and attachments, comment, and flag apparent resolution; IT staff triage a searchable queue, claim or assign work, set priority and status, and keep private notes; administrators manage accounts and review tickets read-only. The project also records a deliberate engineering process: written contracts and acceptance criteria, issue branches, peer-reviewed pull requests, isolated test data, and UI, API, browser, responsive, and accessibility checks.

Highlights:
- Backend authorization protects every sensitive operation independently of hidden frontend controls.
- Session cookies, CSRF checks, Argon2id password hashing, mandatory first-login password changes, and role-aware session invalidation.
- Ticket ownership, approved status transitions, public comments, internal notes, attachment lifecycle, and admin safety rules.
- Documented issue-to-PR traceability and repeated automated test runs, with peer review evidence.

Tech stack: [React, TypeScript, Vite, Bootstrap, Express, Prisma, PostgreSQL, Vitest, Supertest, Playwright]

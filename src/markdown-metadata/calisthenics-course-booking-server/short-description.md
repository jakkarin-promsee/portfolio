# Calisthenics Course Booking — Server

Categories: [Backend APIs, Fitness, MVP Infrastructure]

Summary: The account and service-status backend for a calisthenics coaching MVP. Its Express and TypeScript API persists user, trainer, and administrator accounts in MongoDB, offers role-specific sign-in and JWT session checks, allows admins to create trainers, and reports process and database health. It is a deliberately limited backend companion to the more expansive client prototype: reservations, plans, payments, schedules, and skill progress are not persisted here.

Highlights:
- User registration, role-matched login portals, JWT guards, and fresh-user session checks.
- Mongoose account model with unique normalized email, hashed password, role, and active/blocked/suspended status.
- Environment-driven admin bootstrap, with an optional single-admin enforcement setting.
- Separate runtime, MongoDB, environment, and aggregate status endpoints.

Tech stack: [Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt]

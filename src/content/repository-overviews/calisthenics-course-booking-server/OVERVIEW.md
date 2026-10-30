## The coaching MVP's server makes accounts real while the booking flow remains a prototype.

The [client](/repositories/calisthenics-course-booking-client) is a UX demo I built around a friend's coaching idea while trying an agent-assisted coding workflow. Its screens show a complete-looking path through plans, payment, sessions, and progress. The backend took one narrower piece of that idea: who is allowed into each role, and how can the browser recognize that person on the next request? This repository implements that account foundation with Express, TypeScript, and MongoDB.

## Establishing the role boundary

Users can register, and users, trainers, and administrators sign in through role-matched portals. A JWT-protected session check reads the current account rather than trusting a remembered browser label. Administrators can create trainer accounts. The stored account includes a normalized email, password hash, role, and status; blocked or suspended accounts cannot sign in. Status endpoints report whether the service and database are available for development checks.

The boundary matters as much as the implemented routes. There are no server-side models for plans, payments, trainer availability, bookings, balances, or skill progress. Those screens use sample data in the client and a booking click does not create a reservation here. This is a working identity and role API for an MVP, not a complete coaching-commerce backend.

The repository README also records deployment and hardening work still needed before real customer use, including tighter validation, CORS, rate limiting, and care around the admin bootstrap settings. The value of this page is to show exactly which piece of the larger product the server currently makes real.

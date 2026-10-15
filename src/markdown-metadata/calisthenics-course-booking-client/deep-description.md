# Calisthenics Course Booking — Client

## The experience being prototyped

This client models an online and onsite calisthenics coaching service. It starts with a landing page and plan comparison, then lets a visitor choose a package and review an order. The order modal recalculates a sample total as quantity changes and accepts an injury or allergy note. Guests are sent to sign-in before continuing to the visual payment sequence. This is useful as an end-to-end UX concept and as a concrete handoff surface for a later production system.

Once signed in, a trainee sees a dashboard with example upcoming sessions, a plan balance, a schedule-change control, and a coach-contact dialog. The payment view shows sample transactions; a user can inspect a draft agreement, accept it, view a mock PromptPay QR, and choose a slip image. Completing that sequence changes status only in current page state. The booking calendar shows trainers, seeded occupied slots for today and tomorrow, lunch blocking, sample package balances, movable slot selection, and a booking summary. Saving gives a brief local confirmation and does not reserve a seat or slot on the server. The public skill tree and evaluation routes show movement branches, detail views, levels, XP, and fixed progression data.

## Actual integration boundary

The companion Express/MongoDB server persists accounts and exposes registration, role-specific login, `/auth/me`, admin trainer creation, and status endpoints. `src/stores/auth.store.ts` keeps the browser auth state and checks the session on reload; `src/lib/axios.ts` attaches the bearer token. `src/App.tsx` defines routes and role gates. The plan catalog and prices live in `src/pages/Plans.tsx`; dashboard sessions, booking slots, payments, package balances, and skill progress remain client constants or page state. The README states this distinction clearly to prevent a portfolio reader from mistaking the polished flow for live commerce.

The repo includes responsive screens, reusable UI components, navigation, order and transaction dialogs, and skill-tree components. Its README screenshots were captured from the built client; signed-in captures used a browser-only demo session with `/auth/me` mocked and did not alter any production booking or payment. This gives visual evidence of the prototype without implying backend functionality.

## What the prototype makes visible

The UI attempts to connect plan discovery, account access, payments, coaching schedules, and movement progression into one coherent trainee journey. The README identifies the next engineering decisions needed before real use: persistent plans and availability, time-zone rules, conflict locks, package-balance accounting, payment verification, coach workflows, notification policy, and privacy treatment for health notes. These are explicit boundaries, not shipped features.

## Evidence and open questions

- Sources: `project/calisthenics-course-booking-client/README.md`, `project/calisthenics-course-booking-client/src/App.tsx`, `project/calisthenics-course-booking-client/src/pages/Plans.tsx`, `project/calisthenics-course-booking-client/src/pages/Booking.tsx`, `project/calisthenics-course-booking-client/src/pages/Payment.tsx`, `project/calisthenics-course-booking-client/src/stores/auth.store.ts`, and `project/calisthenics-course-booking-client/src/components/skill-tree/`.
- The repo does not establish real trainees, payments, conversion, or why this domain was chosen. Ask the owner whether the goal was a client pitch, course exercise, personal training idea, or another context, and which user journey was the main design challenge.

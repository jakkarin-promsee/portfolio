# Cinema Booking and Management — Client

## Two sides of one cinema workflow

This SPA is the frontend of a cinema management and customer booking system. The admin side gives cinema staff a dashboard, movie catalog management, venue and seat assignment, show scheduling, booking oversight, and reports. The customer side moves a visitor from login through movie selection, showtime selection, seat map, checkout, and confirmation. Both use the companion API and MySQL data. The pairing makes it possible to see how administrative changes in movies, venues, and schedules become customer-facing availability and later reporting data.

## Admin portal

Admin routes live under `/admin`, with a persistent sidebar and top bar from `AdminPageLayout`. The dashboard shows four current statistics, a seven-day booking trend, and today's showings. Movie Management provides add, edit, and delete flows; the server rejects a deletion if showings still reference the movie. Screen Management combines an hourly grid per venue with a schedule table. Creating a showing on the server populates its seat-state rows. Venue Management lists halls and seat counts and allows seat assignment. Booking Management provides a paginated, searchable, date/status-filtered list with a cancellation action. Reports offers weekly, monthly, or yearly period selection, revenue charts, and summary cards. These pages use focused Zustand stores except for report selection, which is local component state.

## Customer journey and state flow

The public landing page leads to customer login; authenticated customer routes under `/booking` move through movie picker, showtime picker, interactive seat map, checkout, and confirmation. The seat map distinguishes Free, Reserved, and Confirmed status from the API. The checkout page calls the booking creation, checkout, and completion endpoints. The UI uses `src/lib/customerApi.ts` for customer requests, while admin stores use `src/lib/api.ts`; both attach the relevant JWT and redirect to their own login page on a 401 response. `useAuth` and `useCustomerAuth` persist token-related state in local storage under separate keys; other stores load domain data from the server.

React Router defines role-gated routes in `src/App.tsx`. The component/store/API-wrapper/API/database path keeps pages distinct from transport concerns. The client uses Tailwind, Recharts, and a route-dependent theme: dashboard and reports use the light admin treatment, while movies, screens, venues, and bookings use dark styling. `src/lib/seatRowGrouping.ts`, `screenScheduleTime.ts`, and `customerBookingUi.ts` contain display logic for the domain views.

## Limits visible in the code and README

The API host currently defaults to `http://localhost:5000` in two helper files, so deployment to a different host requires changing both or introducing an environment variable. JWTs are stored in browser local storage. The frontend triggers a backend completion endpoint, but the paired backend uses generated proof strings rather than integrating a real payment processor; this should be presented as a booking/payment demonstration, not verified online payment.

## Evidence and open questions

- Sources: `project/cpe241-booking-website-client/README.md`, `project/cpe241-booking-website-client/src/App.tsx`, `project/cpe241-booking-website-client/src/pages/`, `project/cpe241-booking-website-client/src/pages/customer/`, `project/cpe241-booking-website-client/src/store/`, `project/cpe241-booking-website-client/src/lib/api.ts`, and `project/cpe241-booking-website-client/src/lib/customerApi.ts`.
- The repo does not specify the author's exact share of any team implementation, user research, deployment traffic, or real cinema use. Ask the owner which interface and data-flow decisions they personally drove and whether this was a solo or team assignment.

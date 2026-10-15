# Cinema Booking and Management — Server

## The database-backed product

This API supports two related jobs: cinema staff administer movies, venues, seats, showings, bookings, and reports; customers browse showings and book seats. It uses Express 5 with a MySQL database and JWTs for separate Admin and Customer roles. The companion React client presents the workflows, while this repo owns data validation, access rules, SQL reads/writes, and transaction boundaries.

The code follows a route → controller → service → model chain. Routes declare endpoints and authorization; controllers parse requests and shape responses; services enforce domain logic; models issue SQL through the `mysql2` promise pool. The schema has nine tables: accounts, venues, seat labels, movie catalog (`showtimes`, despite the name), venue/seat membership, actual scheduled showings, per-showing seat states, bookings, and booking items. Foreign keys restrict deletion where dependent rows exist. Bootstrap scripts create the database, recreate the schema and indexes, and seed sample data with hashed passwords.

## Admin-side operations

Staff can create and edit movies, venues, assigned seats, and showings; inspect bookings; cancel them; and read dashboard and report aggregates. A movie with showings cannot be deleted. Creating a showing checks for a venue/time overlap under a transaction and inserts a `reserved_seats` row for each seat in the hall, initially Free. If any step fails, the transaction rolls back. The API also gives admin screens live summaries: active movies, screens online today, today's bookings and revenue, upcoming showings with sold/capacity, and period-based sales and occupancy reports. Indexes target booking dates/status, showing dates/venue, and seat-state aggregation. Recursive CTEs generate complete date or month sequences so charts include zero-activity periods instead of gaps.

## Customer booking state and transaction behavior

A customer can read a showing's seat map and create a booking for selected seats. The service validates that selected seat IDs exist as Free and creates `booking` plus `booking_items` rows in a transaction. Importantly, this creation step does not yet change the per-showing seat state. The checkout endpoint locks the customer-owned booking and selected Free seat rows, changes them to Reserved, and advances the booking to Checkout. Completion advances the booking to Successful and changes those seats to Confirmed in another transaction. Admin cancellation releases the booked seats to Free and marks the booking Cancel in a transaction. The service checks status transitions and customer ownership server-side.

The `payment_proof_url` values written during checkout and completion are generated booking markers in the current code, not proof of an external payment transaction. No payment gateway integration is evidenced. The initial availability check at booking creation is also separate from the locked seat hold at checkout, so checkout is the decisive contention point; two preliminary bookings can target a Free seat, but only the one that successfully holds it at checkout should proceed. A portfolio description should preserve this detail rather than claim that initial creation reserves a seat.

## Operational details and constraints

`showtimes` is the movie catalog table; `showing` is the schedule. `pool.js` returns SQL DATE as `YYYY-MM-DD` strings and DECIMAL values as JavaScript numbers to avoid display conversion problems. The README specifies Node 20+, MySQL 8+, configuration through `.env`, and a server/client port agreement. It notes that a missing JWT secret currently produces a warning but does not stop startup, which is a deployment risk. Seed data supports local demonstrations; the repository does not establish production bookings or a real cinema rollout.

## Evidence and open questions

- Sources: `project/cpe241-booking-website-server/README.md`, `project/cpe241-booking-website-server/scripts/002_schema.sql`, `project/cpe241-booking-website-server/src/services/showing.service.js`, `project/cpe241-booking-website-server/src/services/customer.service.js`, `project/cpe241-booking-website-server/src/services/booking.service.js`, `project/cpe241-booking-website-server/src/models/report.model.js`, and `project/cpe241-booking-website-server/src/middleware/auth.middleware.js`.
- The repository does not establish the owner's specific contribution in any team setting, benchmark measurements, deployment load, or actual payment processing. Ask the owner which database invariant or transaction was hardest and how they validated concurrent seat selection.

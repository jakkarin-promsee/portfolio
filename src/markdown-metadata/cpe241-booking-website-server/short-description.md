# Cinema Booking and Management — Server

Categories: [Backend APIs, Databases, Booking Systems]

Summary: An Express and MySQL API serving both cinema administration and customer bookings. It models movies, halls, seats, showings, per-showing seat availability, booking records, and reports, with admin/customer JWT authorization. The significant backend work is in maintaining consistent schedule and seat state through SQL transactions, overlap checks, checkout reservations, booking cancellation, and aggregate queries for dashboards and charts.

Highlights:
- Four-layer route/controller/service/model structure over a MySQL connection pool and nine-table schema.
- Transactional showing creation with an overlap check and automatic seat-state rows.
- Customer booking, checkout seat holds, completion, and admin cancellation with server-side status transitions.
- Indexed reporting queries and recursive CTEs that fill empty dates and months with zero values.

Tech stack: [Node.js, Express, MySQL, SQL transactions, JWT, bcrypt]

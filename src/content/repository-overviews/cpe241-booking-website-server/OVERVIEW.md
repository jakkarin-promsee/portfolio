## The cinema API turns seat selection into a sequence of database decisions.

The companion [client](/repositories/cpe241-booking-website-client) lets staff schedule showings and customers choose seats. In this database-course final project, I wanted to see whether the underlying rules would still hold as the system expanded: a hall cannot host overlapping showings, a seat cannot be held twice at checkout, and cancellation has to release what a booking held. This repository puts those rules in Express services and MySQL transactions.

## Following a seat from free to confirmed

Creating a showing checks for a venue/time conflict and creates seat-state rows for that event in one transaction. A customer can inspect the resulting seat map and create a preliminary booking. That first step records the requested seats but does not reserve them. At checkout, the service locks the booking and still-free seat rows, marks those seats Reserved, and advances the booking state. Completion marks them Confirmed; admin cancellation releases them to Free. If a transaction fails, its partial writes are rolled back.

The same API serves movie, venue, schedule, account, and reporting operations. Dashboard and report queries aggregate bookings and revenue, including periods with no activity so a chart does not silently skip them. Routes and controllers handle requests, services hold the booking rules, and models issue SQL against the shared schema.

This is a database-course system with a demonstrable admin/customer flow. The checkout's proof strings are generated markers, not evidence of a real payment. The important result is a concrete transaction model for scheduling and seats, with the distinction between a preliminary booking and an actual seat hold kept visible.

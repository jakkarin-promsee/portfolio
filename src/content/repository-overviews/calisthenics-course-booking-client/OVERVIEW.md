## A coaching idea became a clickable path from choosing a plan to imagining progress.

I built this React client as a UX experiment around a friend's coaching idea. It also gave me a low-stakes place to try coding agents as part of my own development workflow and see how quickly I could shape a coherent interface. The first screen could advertise training, but a useful concept needed the next decisions too: which plan fits, how might payment and booking look, and how would someone see their skill progress? I connected those questions into one clickable journey.

## Connecting the trainee's steps

A visitor can compare plans, choose a quantity, and review an order. After sign-in, the prototype shows a dashboard, a payment agreement and sample QR flow, a trainer calendar, booking recap, and a skill tree. The companion server implements account registration and role-based sign-in, so the user, trainer, and admin portals have an API boundary. The visible plan prices, transactions, slot availability, booking confirmation, balances, and progress still come from client-side examples.

<!-- overview-media -->

The booking screen is useful because it puts several design questions in one place: trainer choice, occupied times, a plan balance, and the summary of a proposed session. It is also the clearest boundary of this MVP. Pressing save produces a local confirmation; it does **not** reserve a real slot. The payment screen likewise demonstrates a flow without processing money.

This repository owns the trainee-facing interface and its sample journeys. The [server](/repositories/calisthenics-course-booking-server) owns accounts and access checks. Together they make a service idea concrete enough to discuss and let me experiment with frontend design and agent-assisted development. Actual schedules, payment verification, package accounting, and coach operations remain future work.
